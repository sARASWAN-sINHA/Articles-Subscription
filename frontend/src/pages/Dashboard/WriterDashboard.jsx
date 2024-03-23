import React, { useContext } from "react";
import DashboardCard from "../../components/Card/DashboardCard";
import { authContext, userContext } from "../../context";

const WriterDashboard = () => {
  const [loggedInUser, setLoginUser] = useContext(userContext)
  console.log(loggedInUser);
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <DashboardCard
        title={`welcome, ${loggedInUser.first_name === "" ? "writer" : loggedInUser.first_name}`}
        message={
          "As a writer you will have the ability to create content in the forms of standard and premium articles."
        }
      />
    </div>
  );
};

export default WriterDashboard;
