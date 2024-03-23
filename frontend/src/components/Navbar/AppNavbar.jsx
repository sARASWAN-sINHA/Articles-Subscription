import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext, userContext } from "../../context";

function AppNavbar() {
  const [_, setIsLoggedIn] = useContext(authContext);
  const [user, ...extraData] = useContext(userContext);
  return (
    <div className="bg-white flex w-full border-2 border-transparent p-10">
      <Link to={`/${user.is_writer ? "writer" : "client"}/dashboard`} className="w-1/6 ">
        <div className="font-bold text-xl">SARAS-SOCH</div>
      </Link>
      <div className=" flex flex-row justify-around w-5/6">
        <Link to={`/${user.is_writer ? "writer" : "client"}/dashboard`}>
          <span className="uppercase cursor-pointer">Dashboard</span>
        </Link>

        {user.is_writer ? (
          <>
            <Link to="/writer/create-article">
              <span className="uppercase cursor-pointer">Create Article</span>
            </Link>
            <Link to="/writer/show-articles/me">
              <span className="uppercase cursor-pointer">My Articles</span>
            </Link>
          </>
        ) : (
          <Link to="/client/browse-articles">
            <span className="uppercase cursor-pointer">Browse articles</span>
          </Link>
        )}
        <Link to={`/${user.is_writer ? "writer" : "client"}/account/me`}>
          <span className="uppercase cursor-pointer">Account Management</span>
        </Link>
        <span
          className="uppercase cursor-pointer"
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setIsLoggedIn(false)
          }
          }
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export default AppNavbar;
