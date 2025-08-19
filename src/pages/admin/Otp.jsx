import React from "react";
import OtpBox from "../../components/common/OtpBox";
import ThemeToggle from "../../components/common/ThemeToggle";

const Otp = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-light-white dark:bg-dark-blue-900">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <OtpBox />
    </div>
  );
};

export default Otp;
