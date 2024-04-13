import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


import { getUser, updateUser } from "../../state/user/thunk";
import { CustomToastContainer, generateErrorToastr, generateSuccessToastr } from "../Toastr";
import Form from "./Form";
import { userContext } from "../../context";

const AccountDetailsForm = () => {
  const dispatch = useDispatch();

  const userReduxState = useSelector(state => state.userState.user);
  const userContextState = useContext(userContext)[0];
  const updateUserContext = useContext(userContext)[1];
  const initialUserState = userReduxState.id != userContextState.id ? { ...userContextState } : { ...userReduxState }
  const [loggedInUser, _] = useState(initialUserState);
  const userId = userContextState.id

  useEffect(() => {
    toast.promise(
      dispatch(getUser(userId)),
      {
        pending: "Getting user details..."
      }
    )
      .then(result => {
        if (!result.error) {
          generateSuccessToastr("User details fetched!");
          console.log({ ...result.payload });
        }
        else {
          generateErrorToastr("Failed to fetch user details!");
          const data = { ...result.payload.response.data };
          [...Object.keys(data)].map((key) => generateErrorToastr(data[key]));

        }
      })
      .catch(error => generateErrorToastr(error.message));
  }, []);

  const initialPayload = {
    "id": loggedInUser.id,
    "email": loggedInUser.email,
    "first_name": loggedInUser.first_name,
    "last_name": loggedInUser.last_name,
  };
  const [payload, setPayload] = useState(initialPayload);


  const handleEmailChange = (e) => setPayload({ ...payload, email: e.target.value });
  const handleFirstName = (e) => setPayload({ ...payload, first_name: e.target.value });
  const handleLastName = (e) => setPayload({ ...payload, last_name: e.target.value });

  const handleSubmit = () => {
    toast.promise(
      dispatch(updateUser(payload)),
      {
        pending: "Please wait while we update your account details..."
      }
    )
      .then(result => {
        if (!result.error) {
          updateUserContext(userReduxState);
          generateSuccessToastr("Account details successfully updated!");

        }
        else {
          const data = { ...result.payload.response.data };
          [...Object.keys(data)].map((key) => generateErrorToastr(data[key]));
        }
      })
      .catch(error => generateErrorToastr(error.message));
  }

  return (
    <>
      <CustomToastContainer />
      <div className="flex flex-col justify-center items-center">
        <Form
          headerName={"account details"}
          headerInfo={"You may update your account details belpw:"}
          labels={[
            {
              labelName: "Email",
              inputType: "email",
              placeholder: "john.doe@example.com",
              required: true,
              changeHandler: handleEmailChange,
              value: payload.email
            },
            {
              labelName: "First Name",
              inputType: "text",
              placeholder: "John",
              changeHandler: handleFirstName,
              required: true,
              value: payload.first_name
            },
            {
              labelName: "Last Name",
              inputType: "text",
              placeholder: "Doe",
              changeHandler: handleLastName,
              value: payload.last_name
            },
          ]}
          buttonInfo={{ text: "update details", }}
          onSubmitFunction={handleSubmit}
        />
      </div>
    </>

  );
};

export default AccountDetailsForm;
