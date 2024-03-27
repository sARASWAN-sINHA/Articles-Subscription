import React, { useContext, useState } from "react";

import Form from "./Form";
import { userContext } from "../../context";
import { useDispatch, useSelector } from 'react-redux'
import { updateArticle } from "../../state/user/thunk";
import { toast } from "react-toastify";
import { CustomToastContainer, generateErrorToastr, generateSuccessToastr } from "../Toastr";

const AccountDetailsForm = () => {
  const loggedInUser = useSelector(state => state.userState.user)
  const dispatch = useDispatch();

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
      dispatch(updateArticle(payload)),
      {
        pending: "Please wait while we update your account details..."
      }
    )
      .then(result => {
        if (!result.error)
          generateSuccessToastr("Account details successfully updated!");
        else {
          const data = { ...result.payload.response.data };
          [...Object.keys(data)].map((key) => generateErrorToastr(data[key]));
        }
      })
      .catch(error => generateErrorToastr(error.message));
  }

  // console.log(loggedInUser);
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
              value: payload.first_name == "" ? "None" : payload.first_name
            },
            {
              labelName: "Last Name",
              inputType: "text",
              placeholder: "Doe",
              changeHandler: handleLastName,
              value: payload.last_name == "" ? "None" : payload.last_name
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
