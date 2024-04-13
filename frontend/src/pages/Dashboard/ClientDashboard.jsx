import React, { useContext } from "react";
import DashboardCard from "../../components/Card/DashboardCard";
import { userContext } from "../../context";
import { useSelector } from "react-redux";

const ClientDashboard = () => {
  // const [loggedInUser, setLoginUser] = useContext(userContext)
  const loggedInUser = useSelector(state => state.userState.user);
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center gap-10">
      <DashboardCard
        title={`welcome, ${loggedInUser.first_name !== "" ? loggedInUser.first_name : "Client"} `}
        message={
          "As a client you will have the ability to browse through standard and premium articles."
        }
      />
      <DashboardCard title={"subscription status:"} message={"none"} />
    </div>
  );
};

export default ClientDashboard;
