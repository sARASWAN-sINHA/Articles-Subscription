import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, linkTo, type }) => {
  return (
    <div className="w-full flex justify-center">
      <button type={type} className="bg-green-500 p-5 text-white font-semibold w-1/2">
        {linkTo ? (
          // <Link to={linkTo}>{text.toUpperCase()}</Link>
          text.toUpperCase()
        ) : (
          text.toUpperCase()
        )}
      </button>
    </div>
  );
};

export default Button;
