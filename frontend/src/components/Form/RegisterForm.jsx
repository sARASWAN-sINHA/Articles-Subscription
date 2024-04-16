import React from "react";
import Form from "./Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../state/user/thunk";
import { toast } from "react-toastify";
import {
  CustomToastContainer,
  generateErrorToastr,
  generateSuccessToastr,
} from "../Toastr";
import { useNavigate } from "react-router-dom";


import writeArticleBackgroundVideo from "../../assets/writeArticle.mp4"
import VideoBackground from "../VideoBackground";


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialPayload = {
    email: null,
    password: null,
    first_name: "",
    last_name: "",
    is_writer: true,
  };

  const errorMap = {
    "FieldMissing": "Please fill out the required fields! (Marked with *)",
    "PasswordError": "Your password must contain atleast 8 characters and cannot be entirely numeric.",
    "PasswordMismatch": "Passwords do not match!!"
  }

  const [payload, setPayload] = useState(initialPayload);
  const [passwordConfirmationText, setPasswordConfirmationText] = useState("");

  const handleEmailChange = (e) => setPayload({ ...payload, email: e.target.value });
  const handleFirstNameChange = (e) => setPayload({ ...payload, first_name: e.target.value });
  const handleLastNameChange = (e) => setPayload({ ...payload, last_name: e.target.value });
  const handlePasswordChange = (e) => setPayload({ ...payload, password: e.target.value });
  const handleUserTypeChange = (e) => setPayload({ ...payload, is_writer: !payload.is_writer });
  const handlePasswordConfirmationChange = (e) => setPasswordConfirmationText(e.target.value);


  const checkPayload = (payload) => {
    let { password, first_name, last_name } = payload;

    if (first_name.trim().length == 0) return "FieldMissing";
    if ([...password].every((char) => char >= "0" && char <= "9") || password.length < 8) return "PasswordError";
    if (password != passwordConfirmationText) return "PasswordMismatch";
    return "success";
  };


  const handleSubmit = () => {
    console.log(payload);
    let payloadStatus = checkPayload(payload);
    console.log(payloadStatus);
    payloadStatus === "success" ?
      toast
        .promise(dispatch(createUser(payload)), {
          pending: "Please wait..while we dedicate an account for you!!!",
          error: "Something went wrong!",
        })
        .then((result) => {
          if (!result.error) {
            generateSuccessToastr("User created! Hold on...we are taking you to the login page");
            setTimeout(() => navigate("/login"), 3000);
          } else {
            const data = { ...result.payload.response.data };
            [...Object.keys(data)].map((key) =>
              data[key].map((errorMessage) =>
                generateErrorToastr(errorMessage)
              )
            );
          }
        })
      : generateErrorToastr(errorMap[payloadStatus]);

  };
  return (
    <>
      <CustomToastContainer />
      <div className="absolute -inset-9 flex justify-center items-center z-10">
        <Form
          headerName="register"
          headerInfo="Start your journey today whether you are a client or a writer."
          labels={[
            {
              labelName: "Email",
              inputType: "email",
              placeholder: "john.doe@example.com",
              value: payload.email,
              changeHandler: handleEmailChange,
              required: true,
            },
            {
              labelName: "First Name",
              inputType: "text",
              placeholder: "John",
              value: payload.first_name,
              changeHandler: handleFirstNameChange,
              required: true,
            },
            {
              labelName: "Last Name",
              inputType: "text",
              value: payload.last_name,
              changeHandler: handleLastNameChange,
              placeholder: "Doe",
            },
            {
              labelName: "Password",
              inputType: "password",
              value: payload.password,
              changeHandler: handlePasswordChange,
              hintInfo: [
                "Your password must contain atleast 8 characters.",
                "Your password cannot be entirely numeric.",
              ],
              required: true,
            },
            {
              labelName: "Password Confirmation",
              inputType: "password",
              hintInfo: [
                "Enter the same password as before, for verification.",
              ],
              value: passwordConfirmationText,
              changeHandler: handlePasswordConfirmationChange,
              required: true,
            },
          ]}
          checkBoxList={[
            {
              message: "Are you a writer?",
              value: payload.is_writer,
              clickHandler: handleUserTypeChange,
              id: "writerCheck",
            },
          ]}
          buttonInfo={{ text: "register" }}
          links={[
            {
              to: "/login",
              linkDesc: "Already have an account?",
            },
          ]}
          onSubmitFunction={handleSubmit}
        />
      </div>
      <VideoBackground backgroundVideo={writeArticleBackgroundVideo} />
    </>
  );
};
export default RegisterForm;
