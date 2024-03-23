import React from "react";

const DashboardCard = (props) => {
  const { title, message } = props;

  return (
    <div className="w-[35%] p-10 flex flex-col gap-5 items-center rounded-2xl bg-white">
      <h1 className="text-2xl">{title.toUpperCase()}</h1>
      <hr className="w-full" />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-gray-500 py-0 px-2.5 h-full w-3/4 text-center">
          {message}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
