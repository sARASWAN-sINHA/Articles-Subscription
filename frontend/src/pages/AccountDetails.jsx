import {React, useContext, useState} from "react";

import AccountDeletionForm from "../components/Form/AccountDeletionForm";
import AccountDetailsForm from "../components/Form/AccountDetailsForm";
import BrowseSubscriptionForm from "../components/Form/BrowseSubscriptionForm";
import { userContext } from "../context";
import { useSelector } from "react-redux";

const AccountDetails = ({ user }) => {
  const userReduxState = useSelector(state => state.userState.user);
  const userContextState = useContext(userContext)[0];
  const initialUserState = userReduxState.id != userContextState.id ? { ...userContextState } : { ...userReduxState }
  const [loggedInUser, _] = useState(initialUserState);
  return (
    <div className="flex flex-col justify-center items-center">
      <AccountDetailsForm />
      {user.type === "client" && loggedInUser.subscription?.type==null? <BrowseSubscriptionForm /> : null}
      <AccountDeletionForm />
    </div>
  );
};

export default AccountDetails;
