import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { useState } from "react";

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({ email: "", password: "" });
  const handleEmailChange = (e) =>
    setLoginPayload({ ...loginPayload, email: e.target.value });
  const handlePasswordChange = (e) =>
    setLoginPayload({ ...loginPayload, password: e.target.value });
  return (
  <LoginForm loginPayload={loginPayload} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange}/>
  );
};

export default Login;
