import React from "react";
import CountUp from "react-countup";
import ScaleLoader from "react-spinners/ScaleLoader";
import { MdError } from "react-icons/md";

const CountShow = ({ title, count, isLoading, totalError }) => {
  return (
    <div className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-start gap-4 transition-all hover:bg-white/10 hover:border-green/50 group backdrop-blur-sm">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-montserrat font-semibold text-gray-400 text-sm uppercase tracking-wider">
            {title}
        </h1>
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green/20 transition-colors">
             <div className="w-5 h-5 bg-green/50 rounded-full group-hover:bg-green transition-colors"></div>
        </div>
      </div>
      
      <div className="text-4xl font-russo font-bold text-white group-hover:text-green transition-colors">
        {isLoading ? (
            <ScaleLoader color="#16a34a" loading={isLoading} height={25} width={4} />
          ) : totalError ? (
            <span className="text-red-500 text-2xl">
               <MdError />
            </span>
          ) : typeof count === "number" ? (
            <CountUp start={0} end={count} duration={2.5} separator="," />
          ) : (
            <span>0</span>  
        )}
      </div>
    </div>
  );
};

export default CountShow;
