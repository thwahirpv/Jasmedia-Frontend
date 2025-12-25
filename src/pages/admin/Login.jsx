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
  const [email, setEmail] = useState("thwahirpv@gmail.com");
  const [password, setPassword] = useState("Thwa@123");
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
      console.log(err);
    }
  };

  return (
    <div className="relative w-full h-screen bg-agency-black flex justify-center items-center p-6">
      
      {/* Background Ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-russo text-white tracking-widest mb-2">JAS<span className="text-white">MEDIA</span></h1>
            <p className="text-gray-400 text-sm font-opensans">Admin Portal Login</p>
        </div>

        <form className="space-y-6" action="" onSubmit={handleSubmit}>
          <p className={`text-sm text-red-500 font-medium text-center ${error ? "block" : "hidden"}`}>{error}</p>
          
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="relative group">
              <input
                name="email"
                onChange={handleEmailChange}
                onFocus={emailFocus}
                onBlur={emailUnfocus}
                autoComplete="username"
                value={email}
                className="w-full bg-[#1a1a1a] text-white border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder-transparent"
                type="email"
                id="email"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all pointer-events-none text-gray-400
                  ${isEmailFocus || email.length > 0 ? "-top-2.5 text-xs bg-[#1a1a1a] px-1 text-gray-400" : "top-3.5 text-sm"}`}
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                name="password"
                onChange={handlePasswordChange}
                onFocus={passwordFocus}
                onBlur={passwordUnfocus}
                autoComplete="current-password"
                value={password}
                className="w-full bg-[#1a1a1a] text-white border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                type={isShowPassword ? "text" : "password"}
                id="password"
              />
               <label
                htmlFor="password"
                className={`absolute left-4 transition-all pointer-events-none text-gray-400
                  ${isPasswordFocus || password.length > 0 ? "-top-2.5 text-xs bg-[#1a1a1a] px-1 text-gray-400" : "top-3.5 text-sm"}`}
              >
                Password
              </label>
              
              <div
                onClick={showPassword}
                className="absolute top-3.5 right-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                {isShowPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </div>
            </div>

            <div className="flex justify-end">
              <p className="text-gray-400 hover:text-white cursor-pointer text-sm transition-colors"
                onClick={() => navigate('/admin/forgot-password')}
              >
                Forgot password?
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-agency-black py-3 rounded-xl font-bold font-montserrat hover:bg-gray-200 transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <ScaleLoader
                  color="#000000"
                  loading={isLoading}
                  height={15}
                  width={4}
                />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
