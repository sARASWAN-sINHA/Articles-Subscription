import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import AppNavbar from "./AppNavbar";
import LoginNavbar from "./LoginNavbar";
import { authContext } from "../../context";

const Navbar = () => {
  const [isLoggedIn, _] = useContext(authContext);
  return (
    <>
      {isLoggedIn ? <AppNavbar /> : <LoginNavbar />}
      <Outlet />
    </>
  );
};

export default Navbar;
