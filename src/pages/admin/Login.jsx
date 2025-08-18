import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../features/auth/authSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/common/ThemeToggle";

const Login = () => {
  // Hooks
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, user, error, isBlocked } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Email
  const emailFocus = () => setIsEmailFocus(true);
  const emailUnfocus = () => {
    if (email.length == 0) {
      setIsEmailFocus(false);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Password
  const passwordFocus = () => setIsPasswordFocus(true);
  const passwordUnfocus = () => {
    if (password.length == 0) {
      setIsPasswordFocus(false);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const showPassword = () => setIsShowPassword(!isShowPassword);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(logIn({ emailAddress: email, password: password })).unwrap()
      navigate("/admin/dashboard");
    } catch (err) {
      // console.log(err);
      console.log(isBlocked, 'is blcoked')
    }
  };

  return (
    <div className="relative w-full h-[100vh] bg-light-white dark:bg-dark-blue-900 flex justify-center items-center">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="bg-light-gray-300 dark:bg-dark-blue-600 space-y-8 py-7 px-6 pb- rounded-sm">
        <h1 className="text-xl md:text-2xl font-semibold text-light-gray-950 dark:text-dark-white">
          Login
        </h1>
        <form className="space-y-2" action="" onSubmit={handleSubmit}>
          <p className={`text-sm text-error font-[400] ${error ? "block" : "hidden"}`}>{error}</p>
          <div className="flex flex-col gap-7">
            {/* Email */}
            <div className="relative">
              <input
                name="email"
                onChange={handleEmailChange}
                onFocus={emailFocus}
                onBlur={emailUnfocus}
                autoComplete="username"
                className="w-[250px] md:w-[300px] dark:bg-dark-blue-600 focus:dark:bg-dark-blue-600 fo dark:text-dark-white border-2 border-black dark:border-dark-gray px-2 py-1 rounded-sm focus:outline-0 focus:border-2 focus:border-gray-600"
                type="email"
              />
              <span
                className={
                  isEmailFocus
                    ? "absolute text-[12px] left-2 -top-2.5 text-light-gray-800 dark:text-dark-gray bg-[#ececec] dark:dark:bg-dark-blue-600 px-1 text-center pointer-events-none"
                    : "absolute text-sm text-light-gray-800 dark:text-dark-gray left-2 top-1.5 text-center pointer-events-none"
                }
              >
                Email
              </span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                onChange={handlePasswordChange}
                onFocus={passwordFocus}
                onBlur={passwordUnfocus}
                autoComplete="current-password"
                className="w-[250px] md:w-[300px] border-2 dark:text-dark-white border-black dark:border-dark-gray px-2 py-1 rounded-sm focus:outline-0 focus:border-2 focus:border-gray-600"
                type={isShowPassword ? "text" : "password"}
              />
              <span
                className={
                  isPasswordFocus
                    ? "absolute text-[12px] left-2 -top-2.5 text-light-gray-800 dark:text-dark-gray bg-[#ececec] dark:dark:bg-dark-blue-600 px-1 text-center pointer-events-none"
                    : "absolute text-sm text-light-gray-800 dark:text-dark-gray left-2 top-1.5 text-center pointer-events-none"
                }
              >
                Password
              </span>
              <p
                onClick={showPassword}
                className="absolute top-2.5 right-2.5 cursor-pointer text-light-gray-800 dark:text-dark-gray"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </p>

              <p className="text-gray-500 dark:text-dark-gray cursor-pointer text-[13px] text-right mt-1"
                onClick={() => navigate('/admin/forgot-password')}
              >
                Forgot password ?
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-dark-blue-900 dark:bg-dark-gray text-dark-white dark:text-dark-blue-400 text-sm py-1.5 rounded-sm font-[600] cursor-pointer text-center"
            >
              {isLoading ? (
                <ScaleLoader
                  color="#030712"
                  loading={isLoading}
                  height={15}
                  width={4}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
