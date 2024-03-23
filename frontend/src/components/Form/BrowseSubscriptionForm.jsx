import React from "react";
import Form from "./Form";

const BrowseSubscriptionForm = () => {
  return (
    <div>
      <Form
        headerName={"browse subscription plans"}
        headerInfo={"Check all the available subscription plans:"}
        buttonInfo={{text:"View subscription plans", type:"submit"}}
      />
    </div>
  );
};

export default BrowseSubscriptionForm;
