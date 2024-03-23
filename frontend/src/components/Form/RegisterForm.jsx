import React from "react";
import Form from "./Form";

const RegisterForm = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex justify-center items-center">
      <Form
        headerName="register"
        headerInfo="Start your journey today whether you are a client or a writer."
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
            labelName: "Password",
            inputType: "password",
            hintInfo: [
              "Your password must contain atleast 8 characters.",
              "Your password cannot be entirely numeric.",
            ],
            required: true,
          },
          {
            labelName: "Password Confirmation",
            inputType: "password",
            hintInfo: ["Enter the same password as before, for verification."],
            required: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
          },
        ]}
        checkBoxList={[
          {
            message: "Are you a writer?",
            value: true,
            id: "writerCheck",
          },
        ]}
        buttonInfo={{ text: "register", linkTo: "/login" }} //[TODO] Add type:submit in case of form submit button
        links={[
          {
            to: "/login",
            linkDesc: "Already have an account?",
          },
        ]}
        onSubmitFunction={handleSubmit}
      />
    </div>
  );
};

export default RegisterForm;
