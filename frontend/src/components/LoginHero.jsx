import { Link } from "react-router-dom";
import Button from "./Button";
import DashboardCard from "./Card/DashboardCard";

const LoginHero = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[5rem] p-[5rem] h-[90vh]">
      <div className="bg-white p-8 rounded-3xl text-center">
        <h1 className="text-2xl text-yellow-700">
          THOUGHT...SUBSCRIBE FOR THE MOST INFORMATIVE ARTICLES ON THE INTERNET
        </h1>
        <div className="text-gray-500 my-5">
          Browse through our extensive and carefully curated content.
        </div>

        <Link to="/register" className="w-1/2">
          <Button text={"get started today"} />
        </Link>
      </div>
    </div>
  );
};

export default LoginHero;
