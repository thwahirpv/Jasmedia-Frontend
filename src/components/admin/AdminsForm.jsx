import React, { useEffect } from "react";
import { useState } from "react";
import useTheme from "../../hook/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import {
  isEmpty,
  isNotString,
  isNotValidEmail,
  isNotValidPassword,
  isNotValidString,
} from "../../utils/validations";
import { RiAiGenerate } from "react-icons/ri";
import { createAdminThunk } from "../../features/admin/createAdminSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { EMAIL } from "../../constants/constants";

const adminSwal = withReactContent(Swal)

const AdminsForm = ({ setIsModalOpen, isModalOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleData, setRoleData] = useState('');
  const [roleError, setRoleError] = useState("");
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [theme, setTheme] = useTheme();
  const dispatch = useDispatch();
  const { isAdminCreateLoading, adminCreateError } = useSelector((state) => state.createAdmin)

  // Name validation
  const onNameChnage = (e) => {
    const value = e.target.value;
    setName(value);

    if (isEmpty(value)) {
      setNameError("Name is required!");
      return;
    }
    if (isNotString(value)) {
      setNameError("Enter valid Name!");
      return;
    }
    if (isNotValidString(value)) {
      setNameError("Enter valid Name!");
      return;
    }
    setNameError("");
  };

  // Email validation
  const onEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (isEmpty(value)) {
      setEmailError("Email is required!");
      return;
    }
    if (isNotValidEmail(value)) {
      setEmailError("Enter valid Email!");
      return;
    }
    setEmailError("");
  };

  const onAdminRoleChange = (e) => {
    const value = e.target.value;
    setRoleData(value);
    if (isEmpty(value)) {
      setRoleError("Role is required!");
      return;
    }
    setRoleError("");
  };

  const onPasswordChange = (e) => {
    const value = e.target.value 
    setPassword(value)

    if(isEmpty(value)){
      setPasswordError("Password is required!")
      return 
    }
    if(isNotValidPassword(value)) {
      setPasswordError("Use 8 chars, letter, number & symbol!")
      return 
    }
    setPasswordError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Final validation 
    // Name validation
    if (isEmpty(name)) {
      setNameError("Name is required!");
      return;
    }
    if (isNotString(name)) {
      setNameError("Enter valid Name!");
      return;
    }
    if (isNotValidString(name)) {
      setNameError("Enter valid Name!");
      return;
    }

    // Email validation
    if (isEmpty(email)) {
      setEmailError("Email is required!");
      return;
    }
    if (isNotValidEmail(email)) {
      setEmailError("Enter valid Email!");
      return;
    }

    // Role validation
    if (isEmpty(roleData)) {
      setRoleError("Role is required!");
      return;
    }
    
    // Password validation 
    if(isEmpty(password)){
      setPasswordError("Password is required!")
      return 
    }
    if(isNotValidPassword(password)) {
      setPasswordError("Use 8 chars, letter, number & symbol!")
      return 
    }

    const adminData = {
      'name': name,
      'emailAddress': email,
      'isRootAdmin': roleData,
      'password': password
    }

    try {
      const response = await dispatch(createAdminThunk(adminData)).unwrap()
      adminSwal.fire({
        title: 'Admin created',
        text: email,
        icon: 'success',
        timer: 1500, 
        showConfirmButton: true,
        timerProgressBar: true, 
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712'
      }).then((res) => {
        setIsModalOpen(false)
      })
    } catch (error) {
      if(error.errorType == EMAIL) {
        setEmailError(error.message)
      }
      else {
        adminSwal.fire({
          title: 'Failed!',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712'
        }).then((res) => {
          setName("")
          setEmail("")
          setRoleData("")
          setPassword("")
          setNameError('')
          setEmailError("")
          setRoleError("")
          setPasswordError("")
        })
      }
    }

  }

  const generatePassword = (e) => {
    e.preventDefault();
    if (isEmpty(name)) {
      setNameError("First enter name!");
      return;
    }

    const base = name.slice(0, 4);
    const numbers = "0123456789";
    const symbols = "!@#$%&,_";

    const randomNumber = () =>
      numbers[Math.floor(Math.random() * numbers.length)];
    const randomSymbol = () =>
      symbols[Math.floor(Math.random() * symbols.length)];

    const generatedPassword =
      base + randomSymbol() + randomSymbol() + randomNumber() + randomNumber();
    setPassword(generatedPassword);
  }

  useEffect(() => {
    setName("")
    setEmail("")
    setRoleData("")
    setPassword("")
    setNameError('')
    setEmailError("")
    setRoleError("")
    setPasswordError("")
  }, [isModalOpen])

  return (
    <div
      className={`absolute left-0 right-0 opacity-0 h-screen bg-light-gray-50 dark:bg-dark-blue-100 flex justify-center transition-all overflow-hidden
    ${
      isModalOpen
        ? "bottom-0 items-center opacity-100 visible"
        : "invisible bottom-full"
    }`}
    >
      <div className="relative w-[300px] h-fit bg-light-gray-300 dark:bg-dark-blue-900 rounded-md py-6 px-7 flex flex-col items-center space-y-6">
        <span className="absolute cursor-pointer top-2 right-2 text-light-gray-950 dark:text-dark-white">
          <IoCloseSharp
            size={20}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </span>
        <h1 className="font-medium text-light-gray-950 dark:text-dark-white">
          Create Admin
        </h1>
        <div className="w-full">
          <form
            action=""
            className="flex flex-col space-y-3"
            // onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-0.5">
              {nameError ? (
                <p className="text-[11px] text-error">{nameError}</p>
              ) : (
                <label
                  className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white"
                  htmlFor="category_name"
                >
                  Name
                </label>
              )}
              <input
                id="category_name"
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                type="text"
                value={name}
                onChange={onNameChnage}
              />
            </div>
            <div className="flex flex-col space-y-0.5">
              {emailError ? (
                <p className="text-[11px] text-error">{emailError}</p>
              ) : (
                <label
                  className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white"
                  htmlFor="category_name"
                >
                  Email
                </label>
              )}
              <input
                id="category_name"
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                // placeholder="Email"
                type="email"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="flex flex-col space-y-0.5">
              {roleError ? (
                <p className="text-[11px] text-error">{roleError}</p>
              ) : (
                <label
                  className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white"
                  htmlFor="category_name"
                >
                  Admin type
                </label>
              )}
              <select
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1"
                name=""
                value={roleData}
                onChange={onAdminRoleChange}
                id=""
              >
                <option defaultValue={true} value="">
                  Select
                </option>
                <option value={true}>Root admin</option>
                <option value={false}>Local admin</option>
              </select>
            </div>

            <div className="flex flex-col space-y-0.5">
              {passwordError ? (
                  <p className="text-[11px] text-error">{passwordError}</p>
                ) : (
                  <label
                    className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white"
                    htmlFor="category_name"
                  >
                    Password
                  </label>
                )}
              <div className="flex items-center justify-between">
                <input
                  id="password"
                  className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                  type="email"
                  value={password}
                  onChange={onPasswordChange}
                />
                <button className="cursor-pointer px-3 py-2 text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium rounded-md bg-light-gray-950 dark:bg-dark-gray"
                onClick={generatePassword}
                >
                <RiAiGenerate />
              </button>
              </div>
            </div>
            <button
              className="cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray"
              type="submit"
              onClick={handleSubmit}
            >
              {
                isAdminCreateLoading ? 
                <ScaleLoader
                  color="#030712"
                  loading={isAdminCreateLoading}
                  height={10}
                  width={4}
                />
                : 
                "Create"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminsForm;
