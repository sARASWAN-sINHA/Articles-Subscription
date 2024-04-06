import React from "react";
import Form from "./Form";
import DeleteAccountModal from "../DeleteAccountModal";

const AccountDeletionForm = () => {

  const openDeleteModal = ()=>{
    console.log("Hello!");
    document.getElementById("deletion-modal").showModal();
  }
  return (
    <>
      <Form
        headerName={"account deletion"}
        headerInfo={"Proceed below to delete your account:"}
        links={[
          {
            clickHandler: openDeleteModal,
            linkDesc: "Delete your account",
          },
        ]}
      />
      <DeleteAccountModal />
    </>
  );
};

export default AccountDeletionForm;
