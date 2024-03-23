import { useContext } from "react";
import { authContext } from "../../context";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  const [_, setIsLoggedIn] = useContext(authContext);
  return (
    <div className="bg-white flex w-full border-2 border-transparent p-10">
      <div className="w-4/5 font-bold text-xl">SARAS-SOCH</div>
      <div className="flex w-1/5 mr-5 font-semibold text-lg">
        <span className="w-2/3 text-lg cursor-pointer">
          <Link to="/register">REGISTER</Link>
        </span>
        <span
          className="w-1/3 text-lg cursor-pointer"
          // onClick={() => setIsLoggedIn(true)}
        >
          <Link to="/login">LOGIN</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginNavbar;
