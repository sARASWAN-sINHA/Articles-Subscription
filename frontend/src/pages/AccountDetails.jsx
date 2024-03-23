import React from "react";
import AccountDeletionForm from "../components/Form/AccountDeletionForm";
import AccountDetailsForm from "../components/Form/AccountDetailsForm";
import BrowseSubscriptionForm from "../components/Form/BrowseSubscriptionForm";

const AccountDetails = ({ user }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <AccountDetailsForm />
      {user.type === "client" ? <BrowseSubscriptionForm /> : null}
      <AccountDeletionForm />
    </div>
  );
};

export default AccountDetails;
