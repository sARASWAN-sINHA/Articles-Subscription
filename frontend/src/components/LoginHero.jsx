import { Link } from "react-router-dom";
import Button from "./Button";

const LoginHero = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[2rem] p-[5rem] h-[90vh]">
      <h1 className="text-2xl">
        THOUGHT...SUBSCRIBE FOR THE MOST INFORMATIVE ARTICLES ON THE INTERNET
      </h1>
      <div className="text-gray-500">
        Browse through our extensive and carefully curated content.{" "}
      </div>
      <Link to="/register" className="w-1/2">
        <Button text={"get started today"} />
      </Link>
    </div>
  );
};

export default LoginHero;
