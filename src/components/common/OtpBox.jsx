import React, { useRef, useState } from 'react'

const OtpBox = () => {
    const [otp, setOtp] = useState(Array(4).fill(""))
    const inputRefs = useRef([])

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
  return (
    <div className="flex flex-col justify-center items-center space-y-8 bg-light-gray-300 dark:bg-dark-blue-600 py-7 px-10 rounded-md shadow">
      <div className="space-y-3">
        <h1 className="text-xl md:text-2xl font-semibold text-light-gray-950 dark:text-dark-white text-center">Email Verification</h1>
        <p className="text-sm text-light-gray-800 dark:text-dark-gray text-center">
            Enter the 4-digit code sent to your <br/> email thwahirxpv@gamil.com
        </p>
      </div>
      <div>
        <form id="otp-form" className="flex flex-col space-y-3.5">
            <div className="">
                {/* <p className="text-[13px] text-error ml-0.5 mb-0.5">{otpError}</p> */}
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
            // onClick={}
            >
                Verify
              {/* {
                isRegisterOtpLoading ? 
                <ScaleLoader height={15} width={3} color="#FFFFFF" />
                :
                "Verify"
              } */}
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
