import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../features/auth/authSlice";



const Login = () => {
  // Hooks
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false)
  const dispatch = useDispatch()
  const { isLoading, user, error } = useSelector((state) => state.auth)

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
  const showPassword = () => setIsShowPassword(!isShowPassword)

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    // await dispatch(logIn({email: email, password: password}))
  }

  return (
    <div className="w-full h-[100vh] bg-primary flex justify-center items-center">
      <div className="bg-secondary space-y-8 py-7 px-6 pb- rounded-sm">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-950">Login</h1>
        <form className="space-y-2" action="" onSubmit={handleSubmit}>
          {/* <p className="text-sm text-red-600 font-[500]">Invalid email !</p> */}
          <div className="flex flex-col gap-7">
            {/* Email */}
            <div className="relative">
              <input
                name="email"
                onChange={handleEmailChange}
                onFocus={emailFocus}
                onBlur={emailUnfocus}
                className="w-[250px] md:w-[300px] border-2 border-black px-2 py-1 rounded-sm focus:outline-0 focus:border-2 focus:border-gray-600"
                type="email"
              />
              <span
                className={
                  isEmailFocus
                    ? "absolute text-[12px] left-2 -top-2.5 bg-[#ececec] px-1 text-center pointer-events-none"
                    : "absolute text-sm text-gray-800 left-2 top-1.5 bg-secondary text-center pointer-events-none"
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
                className="w-[250px] md:w-[300px] border-2 border-black px-2 py-1 rounded-sm focus:outline-0 focus:border-2 focus:border-gray-600"
                type={isShowPassword ? "text" : "password"}
              />
              <span
                className={
                  isPasswordFocus
                    ? "absolute text-[12px] left-2 -top-2.5 bg-[#ececec] px-1 text-center pointer-events-none"
                    : "absolute text-sm text-gray-800 left-2 top-1.5 bg-secondary text-center pointer-events-none"
                }
              >
                Password
              </span>
              <p 
              onClick={showPassword}
              className="absolute top-2.5 right-2.5 cursor-pointer text-gray-800">
                {
                  isShowPassword ? <FaEyeSlash /> : <FaEye />
                }
              </p>
            </div>

            {/* Submit button */}
          <button type="submit" className="bg-blue-500 text-gray-950 text-sm py-1 rounded-sm font-[500] cursor-pointer">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
