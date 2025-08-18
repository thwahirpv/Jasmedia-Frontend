import React, { useState, useEffect } from "react";
import ThemeToggle from "../../components/common/ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailThunk, clearEmailVerifyError, setOtpEmail } from "../../features/auth/verifyEmailSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isEmailVerifyLoading, errorEmailVerify } = useSelector(
    (state) => state.verifyEmail
  );
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      emailAddress: email,
    };

    try {
      const response = await dispatch(verifyEmailThunk(data)).unwrap()
      dispatch(setOtpEmail(email))
      navigate("/admin/otp");
    } catch (error) {
      console.log(error, "error from front");
      console.log(errorEmailVerify, "form redux state");
    }
  };

  useEffect(() => {
    dispatch(clearEmailVerifyError())
  }, [])

  return (
    <div className="relative w-full h-[100vh] bg-light-white dark:bg-dark-blue-900 flex justify-center items-center">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="bg-light-gray-300 dark:bg-dark-blue-600 space-y-8 py-7 px-6 pb- rounded-sm">
        <h1 className="text-xl md:text-2xl font-semibold text-light-gray-950 dark:text-dark-white">
          Email
        </h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit}
          action=""
        >
          <div className="flex flex-col space-y-0.5">
            {errorEmailVerify ? (
              <label htmlFor="" className="text-[12px] text-error">
                {errorEmailVerify}
              </label>
            ) : (
              <label
                htmlFor=""
                className="text-[12px] text-gray-500 ml-0.5 dark:text-dark-gray"
              >
                Email
              </label>
            )}

            <input
              name="email"
              onChange={handleEmailChange}
              placeholder="Enter your email"
              autoComplete="username"
              className="w-[250px] md:w-[300px] dark:bg-dark-blue-600 focus:dark:bg-dark-blue-600 fo dark:text-dark-white border-2 border-black dark:border-dark-gray px-2 py-1 rounded-sm focus:outline-0 focus:border-2 focus:border-gray-600"
              type="email"
            />
          </div>
          <button
            type="submit"
            className="bg-dark-blue-900 dark:bg-dark-gray text-dark-white dark:text-dark-blue-400 text-sm py-1.5 rounded-sm font-[600] cursor-pointer text-center"
            onClick={handleSubmit}
          >
            {isEmailVerifyLoading ? (
              <ScaleLoader
                color="#030712"
                loading={isEmailVerifyLoading}
                height={10}
                width={4}
              />
            ) : (
              "Sent OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
