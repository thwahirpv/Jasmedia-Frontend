import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtpThunk, clearOtpError } from '../../features/auth/verifyOtpSlice'
import { useNavigate } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'

const OtpBox = () => {
    const [otp, setOtp] = useState(Array(4).fill(""))
    const inputRefs = useRef([])
    const disptch = useDispatch()
    const { OtpEmail } = useSelector((state) => state.verifyEmail)
    const { isOtpVerifyLoading, errorOtpVerify } = useSelector((state) => state.verifyOtp)
    const navigate = useNavigate()

    const handleKeyDown = (e) => {
        const index = inputRefs.current.indexOf(e.target)
      
        if (
          !/^[0-9]{1}$/.test(e.key) &&
          e.key !== "Backspace" &&
          e.key !== "Delete" &&
          e.key !== "Tab" &&
          !e.metaKey &&
          !e.ctrlKey
        ) {
          e.preventDefault()
        }
      
        if (e.key === "Backspace") {
          e.preventDefault()
          setOtp((prevOtp) => {
            const newOtp = [...prevOtp]
      
            if (newOtp[index]) {
              newOtp[index] = ""
            } else if (index > 0) {
              newOtp[index - 1] = ""
              inputRefs.current[index - 1].focus()
            }
      
            return newOtp
          });
        }
      };
    
      const handleInput = (e) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target)
        if (target.value) {
          setOtp((prevOtp) => [
            ...prevOtp.slice(0, index),
            target.value,
            ...prevOtp.slice(index + 1),
          ]);
          if (index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
          }
        }
        
      };
    
      const handleFocus = (e) => {
        e.target.select()
      };
    
      const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text")
        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
          return
        }
        const digits = text.split("")
        setOtp(digits)
      };

      const handleSumbit = async (e) => {
        e.preventDefault()
        
        const data = {
          'emailAddress': OtpEmail,
          'otp': otp.join("")
        }

        try {
          const response = await disptch(verifyOtpThunk(data)).unwrap()
          disptch(clearOtpError())
          navigate('/admin/password')
        } catch (error) {
          console.log(error, 'from front err')
        }
      }

      useEffect(() => {
        disptch(clearOtpError())
      }, [])
  return (
    <div className="flex flex-col justify-center items-center space-y-8 bg-light-gray-300 dark:bg-dark-blue-600 py-7 px-10 rounded-md shadow">
      <div className="space-y-3">
        <h1 className="text-xl md:text-2xl font-semibold text-light-gray-950 dark:text-dark-white text-center">Email Verification</h1>
        <p className="text-sm text-light-gray-800 dark:text-dark-gray text-center">
            Enter the 4-digit code sent to your <br/> email {OtpEmail}
        </p>
      </div>
      <div>
        <form id="otp-form" className="flex flex-col space-y-3.5">
            <div className="">
                <p className={`text-[13px] text-error ml-0.5 transition-all ${errorOtpVerify ? "mb-0.5 opacity-100 visible": "mb-0 opacity-0 invisible" }`}>{errorOtpVerify}</p>
                <div className="flex gap-2">
                    {otp.map((digit, index) => (
                    <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="shadow-xs flex w-[40px] items-center justify-center rounded-lg border border-stroke border-black dark:border-dark-gray text-black dark:text-dark-white p-2 text-center text-md font-medium text-gray-5 outline-none"
                    />
                ))}
                </div>
            </div>
          
            <button 
            className="bg-dark-blue-900 dark:bg-dark-gray text-dark-white dark:text-dark-blue-400 text-sm py-1.5 rounded-sm font-[600] cursor-pointer text-center"
            onClick={handleSumbit}
            >
              {
                isOtpVerifyLoading ? 
                <ScaleLoader height={15} width={3} color="#FFFFFF" />
                :
                "Verify"
              }
            </button>
        </form>
      </div>
      <div>
        <p className="text-sm text-black-900 text-light-gray-800 dark:text-dark-gray">
            Didn't receive code? 
            <span className="text-blue-600 ml-1.5 cursor-pointer">
                Resent
            </span>
        </p>
      </div>
    </div>
  )
}

export default OtpBox
