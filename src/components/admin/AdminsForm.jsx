import React, { useEffect } from "react";
import ReactDOM from "react-dom";
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
  const [roleData, setRoleData] = useState("");
  const [roleError, setRoleError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  // Role validation
  const onAdminRoleChange = (e) => {
    const value = e.target.value;
    setRoleData(value);
    if (isEmpty(value)) {
      setRoleError("Role is required!");
      return;
    }
    setRoleError("");
  };

  // Password validation
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
        background: '#1a1a1a',
        color: '#ffffff'
      }).then((res) => {
        setIsModalOpen(false)
      })
    } catch (error) {
      const errMessage = error?.message || "Admin create failed";
      if(error.errorType == EMAIL) {
        setEmailError(errMessage)
      }
      else {
        adminSwal.fire({
          title: 'Failed!',
          text: errMessage,
          icon: 'error',
          showConfirmButton: true,
          background: '#1a1a1a',
          color: '#ffffff'
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

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-agency-black/90 backdrop-blur-sm flex justify-center items-center transition-all duration-300
      ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      <div className="relative w-[90%] max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-2xl">
        <span className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-full">
          <IoCloseSharp
            size={24}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </span>
        <h1 className="text-2xl font-bold font-russo text-white tracking-wide">
          Create Admin
        </h1>
        <div className="w-full">
          <form
            action=""
            className="flex flex-col space-y-5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="space-y-1">
              {nameError ? (
                <p className="text-red-500 text-xs pl-1">{nameError}</p>
              ) : null}
              <input
                id="name"
                className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                placeholder="Name"
                type="text"
                value={name}
                onChange={onNameChnage}
              />
            </div>

            <div className="space-y-1">
              {emailError ? (
                <p className="text-red-500 text-xs pl-1">{emailError}</p>
              ) : null}
              <input
                id="email"
                className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={onEmailChange}
              />
            </div>

            <div className="space-y-1">
              {roleError ? (
                <p className="text-red-500 text-xs pl-1">{roleError}</p>
              ) : null}
              <select
                 className="w-full bg-agency-black/50 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 transition-all appearance-none cursor-pointer"
                value={roleData}
                onChange={onAdminRoleChange}
              >
                <option value="" disabled className="text-gray-500">Select Admin Type</option>
                <option value={true} className="bg-agency-black">Root Admin</option>
                <option value={false} className="bg-agency-black">Local Admin</option>
              </select>
            </div>

            <div className="space-y-1">
              {passwordError ? (
                  <p className="text-red-500 text-xs pl-1">{passwordError}</p>
                ) : null}
              <div className="relative">
                <input
                  id="password"
                  className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                  placeholder="Password"
                  type="text"
                  value={password}
                  onChange={onPasswordChange}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
                  onClick={generatePassword}
                  title="Generate Password"
                >
                  <RiAiGenerate size={20} />
                </button>
              </div>
            </div>

            <button
               className="w-full bg-white hover:bg-gray-200 text-agency-black font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer"
              type="submit"
            >
              {
                isAdminCreateLoading ? 
                <ScaleLoader
                  color="#000000"
                  loading={isAdminCreateLoading}
                  height={15}
                  width={4}
                />
                : 
                "Create Admin"
              }
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AdminsForm;
