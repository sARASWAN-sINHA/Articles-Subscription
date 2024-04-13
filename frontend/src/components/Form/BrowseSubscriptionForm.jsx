import React, { useContext } from "react";

import Form from "./Form";
import { userContext } from "../../context";
import { useNavigate } from 'react-router-dom';

const BrowseSubscriptionForm = () => {
  const [loggedInUser, _] = useContext(userContext);
  const navigate = useNavigate();
  const handleSubmit = () => navigate("/client/account/browse-subscription");
  
  return (
    <div>
      <Form
        headerName={"browse subscription plans"}
        headerInfo={"Check all the available subscription plans:"}
        buttonInfo={{ text: "View subscription plans", linkTo: `/client/account/browse-subscription` }}
        onSubmitFunction={handleSubmit}
      />
    </div>
  );
};

export default BrowseSubscriptionForm;
