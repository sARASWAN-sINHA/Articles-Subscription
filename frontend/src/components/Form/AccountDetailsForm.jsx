import React from "react";

import Form from "./Form";

const AccountDetailsForm = () => {
  return (
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
          },
          {
            labelName: "First Name",
            inputType: "text",
            placeholder: "John",
            required: true,
          },
          {
            labelName: "Last Name",
            inputType: "text",
            placeholder: "Doe",
          },
          {
            labelName: "Last name",
            required: true,
            inputType: "text",
          },
        ]}
        buttonInfo={{ text: "update details", linkto: "/", type: "submit" }}
      />
    </div>
  );
};

export default AccountDetailsForm;
