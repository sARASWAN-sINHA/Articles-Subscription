import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { useState } from "react";

import loginBackgroundVideo from "../assets/bg-video-login.mp4"
import VideoBackground from "../components/VideoBackground";

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({ email: "", password: "" });
  const handleEmailChange = (e) => setLoginPayload({ ...loginPayload, email: e.target.value });
  const handlePasswordChange = (e) => setLoginPayload({ ...loginPayload, password: e.target.value });
  return (
    <>
      <VideoBackground backgroundVideo={loginBackgroundVideo} />
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <LoginForm loginPayload={loginPayload} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} />
      </div>
    </>
  );
};

export default Login;
