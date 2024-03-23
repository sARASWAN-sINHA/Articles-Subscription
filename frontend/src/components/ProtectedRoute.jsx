import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context";

function ProtectedRoute(props) {
  const { children } = props;

  const [isLoggedIn, _] = useContext(authContext);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
