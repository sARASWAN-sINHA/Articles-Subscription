import React from "react";
import Form from "./Form";

const AccountDeletionForm = () => {
  return (
    <Form
      headerName={"account deletion"}
      headerInfo={"Proceed below to delete your account:"}
      links={[
        {
          to: "/",
          linkDesc: "Delete your account",
        },
      ]}
    />
  );
};

export default AccountDeletionForm;
