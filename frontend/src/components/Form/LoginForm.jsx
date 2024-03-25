import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomToastContainer, generateErrorToastr } from "../Toastr";

import { authContext, userContext } from "../../context";
import Form from "./Form";

const LoginForm = (props) => {
  const { loginPayload, handleEmailChange, handlePasswordChange } = props;

  const [isLoggedIn, setIsLoggedIn] = useContext(authContext);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const navigate = useNavigate();

  const checkPayload = () => {
    let callApiStatus = true;
    if (loginPayload.email === "" || loginPayload.password === "") {
      generateErrorToastr("Email and password required!");
      callApiStatus = false;
    }
    return callApiStatus;
  };

  const saveTokenInLocalStorage = ({ access, refresh }) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }

  const handleSubmit = async () => {
    console.log(loginPayload);

    checkPayload() ?
      toast.promise(
        
        axios
          .post("http://127.0.0.1:8000/auth/jwt/create", loginPayload) //generate token for user 
          .then(jwtTokenData => {

            saveTokenInLocalStorage(jwtTokenData.data);
            const { access, refresh } = jwtTokenData.data;
            
            // get user details
            let userId = jwtDecode(access).user_id;

            let options = { headers: { 'Authorization': "JWT " + access } }
            axios
              .get(`http://127.0.0.1:8000/auth/users/${userId}`, options)
              .then(loggedInUserDetails => {
                console.log(loggedInUserDetails);
                setLoggedInUser(loggedInUserDetails.data)
                setIsLoggedIn(true);
                navigate(`/${loggedInUserDetails.data.is_writer ? "writer" : "client"}/dashboard`)
              })
          })
          .catch((error) => {
            if (error.response) generateErrorToastr(error.response.data.detail);
            else if (error.request) generateErrorToastr("Server error!");
            else generateErrorToastr(error.response.data.detail);
          }),
        {
          pending: "Signing in....Please wait...",
        }
      ) : null;



  };

  return (
    <>
      <CustomToastContainer />
      <div className="flex justify-center items-center">
        <Form
          headerName={"login"}
          headerInfo={"Proceed to login to your account"}
          labels={[
            {
              labelName: "Email",
              inputType: "email",
              placeholder: "john.doe@example.com",
              required: true,
              value: loginPayload.email,
              changeHandler: handleEmailChange,
            },
            {
              labelName: "Password",
              inputType: "password",
              required: true,
              value: loginPayload.password,
              changeHandler: handlePasswordChange,
            },
          ]}
          buttonInfo={{
            text: "login",
            linkTo: "/writer/dashboard",
            type: "submit",
          }}
          links={[
            {
              to: "/register",
              linkDesc: "Don't have an account?",
            },
            {
              to: "/",
              linkDesc: "Forgotten your password?",
            },
          ]}
          onSubmitFunction={handleSubmit}
        />
      </div>
    </>
  );
};

export default LoginForm;


