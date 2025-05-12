import React from "react";
import CountUp from "react-countup";
import ScaleLoader from "react-spinners/ScaleLoader";
import { MdError } from "react-icons/md";

const CountShow = ({ title, count, isLoading, totalError }) => {
  return (
    <div className="w-fitf flex flex-col justify-center items-center bg-light-white dark:bg-dark-blue-400 p-7 rounded-md shadow space-y-3">
      <h1 className="font-[500] text-md text-light-gray-950 dark:text-dark-white ">
        {title}
      </h1>
      <h1 className="text-center font-[500] text-light-gray-950 text-2xl dark:text-dark-gray">
        {isLoading && (
          <ScaleLoader
            color="#030712"
            loading={isLoading}
            height={15}
            width={4}
          />
        )}
        {totalError ? (
          <p className="text-red-500">
            <MdError />
          </p>
        ) : (
          <CountUp start={0} end={count} duration={3} />
        )}
      </h1>
    </div>
  );
};

export default CountShow;
