import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext, userContext } from "../../context";

function AppNavbar() {
  const [_, setIsLoggedIn] = useContext(authContext);
  const [user, ...extraData] = useContext(userContext);
  return (
    <div className=" backdrop-blur-2xl backdrop-opacity-100 flex w-full h-[9rem] border-2 border-transparent p-10 z-50">
      <Link to={`/${user.is_writer ? "writer" : "client"}/dashboard`} className="w-1/6 ">
        <div className="font-bold text-2xl">SARAS-SOCH</div>
      </Link>
      <div className=" flex flex-row justify-around w-5/6">
        <Link to={`/${user.is_writer ? "writer" : "client"}/dashboard`}>
          <span className="uppercase cursor-pointer font-bold">Dashboard</span>
        </Link>

        {user.is_writer ? (
          <>
            <Link to="/writer/create-article">
              <span className="uppercase cursor-pointer font-bold">Create Article</span>
            </Link>
            <Link to="/writer/show-articles/me">
              <span className="uppercase cursor-pointer font-bold">My Articles</span>
            </Link>
          </>
        ) : (
          <Link to="/client/browse-articles">
            <span className="uppercase cursor-pointer font-bold">Browse articles</span>
          </Link>
        )}
        <Link to={`/${user.is_writer ? "writer" : "client"}/account/me`}>
          <span className="uppercase cursor-pointer font-bold">Account Management</span>
        </Link>
        <span
          className="uppercase cursor-pointer font-bold"
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
