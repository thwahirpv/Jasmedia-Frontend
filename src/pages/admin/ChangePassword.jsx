import React, { useState } from "react";
import ThemeToggle from "../../components/common/ThemeToggle";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { isEmpty, isNotValidPassword } from "../../utils/validations";
import { PiCheckCircleFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordThunk } from "../../features/auth/changePasswordSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { EMAIL, PASSWORD, UNREGISTERED } from "../../constants/constants";
import useTheme from '../../hook/useTheme'
import { useNavigate } from "react-router-dom";

const changePasswordSwal = withReactContent(Swal)

const ChangePassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confrimPasswordMessage, setConfrimPasswordMessage] = useState("");
  const [theme, setTheme] = useTheme()
  const dispatch = useDispatch()
  const { isChangePasswordLaoding, changePasswordError } = useSelector((state) => state.changePassword)
  const { OtpEmail } = useSelector((state) => state.verifyEmail)
  const navigate = useNavigate()

  const showPassword = () => setIsShowPassword(!isShowPassword);
  const showConfirmPassword = () =>
    setIsShowConfirmPassword(!isShowConfirmPassword);

  const onPasswordChange = (e) => {
    const value = e.target.value;

    if (isEmpty(value)) {
      setPasswordError("Password is required!");
      return;
    }
    if (isNotValidPassword(value)) {
      setPasswordError("Use 8 chars, letter, number & symbol!");
      return;
    }
    setPassword(value);
    setPasswordError("");
  };

  const onConfirmPasswordChnage = (e) => {
    const value = e.target.value;

    if (isEmpty(value)) {
      setConfrimPasswordMessage("Confrim password is required!");
      return;
    }

    if (!password || password !== value) {
      setConfrimPasswordMessage("Passwords didn’t match!");
      return;
    }
    setConfrimPasswordMessage("Matched");
    setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Final validatoin 
    if (isEmpty(password)) {
      setPasswordError("Password is required!");
      return;
    }
    if (isNotValidPassword(password)) {
      setPasswordError("Use 8 chars, letter, number & symbol!");
      return;
    }
    if (password !== confirmPassword) {
      setConfrimPasswordMessage("Passwords didn’t match!");
      return;
    }

    const data = {
        'emailAddress': OtpEmail, 
        'password': password
    }

    try {
        const response = await dispatch(changePasswordThunk(data)).unwrap()
        changePasswordSwal.fire({
            title: 'Password changed successfully',
            icon: 'success',
            allowOutsideClick: true,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Login',
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712',
          }).then((res) => {
            navigate('/admin/login')
          })
    } catch (error) {
        console.log(changePasswordError, 'from front error')
        if(changePasswordError.errorType == EMAIL){
          changePasswordSwal.fire({
            title: 'Changing password failed!',
            icon: 'error',
            text: `${changePasswordError.message}`,
            allowOutsideClick: true,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Verify Email',
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712',
          }).then((res) => {
            navigate('/admin/forgot-password')
          })
        }
        else if(changePasswordError.errorType == PASSWORD){
          changePasswordSwal.fire({
            title: 'Changing password failed!',
            icon: 'error',
            text: `${changePasswordError.message}`,
            allowOutsideClick: true,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Re-enter password',
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712',
          })
        }
        else if(changePasswordError.errorType == UNREGISTERED){
          changePasswordSwal.fire({
            title: 'Changing password failed!',
            icon: 'error',
            text: `${changePasswordError.message}`,
            allowOutsideClick: true,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Verify Email',
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712',
          }).then((res) => {
            navigate('/admin/forgot-password')
          })
        }
        else{
          changePasswordSwal.fire({
            title: 'Changing password failed!',
            icon: 'error',
            text: `${changePasswordError.message}`,
            allowOutsideClick: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'To login',
            cancelButtonText: 'No, here',
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712',
          }).then((res) => {
            if(res.isConfirmed) {
              navigate('/admin/login')
            }
          })
        }
    }


  }

  return (
    <div className="relative w-full h-[100vh] bg-light-gray-300 dark:bg-dark-blue-900 pb-[20px] pt-[100px] px-[15px] md:pt-[100px] md:px-[100px]">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-light-white dark:bg-dark-blue-600 w-[290px] px-[30px] py-[30px] space-y-[60px] rounded-md">
          <h1 className="text-[17px] text-center text-light-gray-950 dark:text-dark-white">
            Change your password
          </h1>
          <form className="space-y-[17px]" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              {passwordError ? (
                <p className="text-error text-[13px] ml-0.5">{passwordError}</p>
              ) : (
                <label
                  htmlFor="password"
                  className="ml-0.5 text-[13px] text-light-gray-950 dark:text-dark-white"
                >
                  Password
                </label>
              )}
              <div className="relative w-full">
                <input
                  className="bg-gray-100 dark:bg-gray-300 w-full rounded-md py-[5px] px-2.5 focus:outline focus:bg-light-gray-400"
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  onChange={onPasswordChange}
                />
                <p
                  onClick={showPassword}
                  className="absolute top-2.5 right-2.5 cursor-pointer text-light-gray-800 dark:text-light-gray-950"
                >
                  {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {confrimPasswordMessage ? (
                <p
                  className={`text-[13px] flex items-center ${
                    confrimPasswordMessage == "Matched"
                      ? "text-green-600"
                      : "text-error"
                  }`}
                >
                  {confrimPasswordMessage}
                  {confrimPasswordMessage == "Matched" && (
                    <span className="ml-1">{<PiCheckCircleFill />}</span>
                  )}
                </p>
              ) : (
                <label
                  htmlFor="password"
                  className="ml-0.5 text-[13px] text-light-gray-950 dark:text-dark-white"
                >
                  Confirm password
                </label>
              )}
              <div className="relative w-full">
                <input
                  className="bg-gray-100 dark:bg-gray-300 w-full rounded-md py-[5px] px-2.5 focus:outline focus:bg-light-gray-400"
                  type={isShowConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  onChange={onConfirmPasswordChnage}
                />
                <p
                  onClick={showConfirmPassword}
                  className="absolute top-2.5 right-2.5 cursor-pointer text-light-gray-800 dark:text-light-gray-950"
                >
                  {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </p>
              </div>
            </div>

            <div className="mt-[30px]">
              <button type="submit" className="py-1.5 px-3 bg-gray-700 dark:bg-light-gray-950 text-white rounded-md w-full text-sm cursor-pointer">
                {
                  isChangePasswordLaoding ? 
                  <ScaleLoader
                  color="#030712"
                  loading={isChangePasswordLaoding}
                  height={15}
                  width={4}
                />
                : 
                "Change"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
