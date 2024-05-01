import React, { useContext, useState } from "react";
import DashboardCard from "../../components/Card/DashboardCard";
import { userContext } from "../../context";
import { useSelector } from "react-redux";

const ClientDashboard = () => {
  const userReduxState = useSelector(state => state.userState.user);
  const userContextState = useContext(userContext)[0];
  const initialUserState = userReduxState.id != userContextState.id ? { ...userContextState } : { ...userReduxState }
  const [loggedInUser, _] = useState(initialUserState);

  const userSubscription = loggedInUser.subscription.length!=0?loggedInUser.subscription[loggedInUser.subscription.length-1]:null;
  const subscriptionMessage = userSubscription?.is_active ?
    userSubscription.type == "STD" ? "Standard" : "Premium"
    : "None";

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center gap-10">
      <DashboardCard
        title={`welcome, ${loggedInUser.first_name !== "" ? loggedInUser.first_name : "Client"} `}
        message={
          "As a client you will have the ability to browse through standard and premium articles."
        }
      />
      <DashboardCard title={"subscription status:"} message={subscriptionMessage.toUpperCase()} />
    </div>
  );
};

export default ClientDashboard;
