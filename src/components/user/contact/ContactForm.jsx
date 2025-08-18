import React, { useRef, useState } from 'react'
import { Particles } from '../../magicui/particles';
import { useDispatch, useSelector } from 'react-redux';
import { contactFormThunk } from '@/features/auth/ContactFormSlice';
import { ScaleLoader } from 'react-spinners';
import { FAILED, SUCCESS } from '@/constants/constants';
import Popup from './PopUp';

const ContactForm = () => {
    const [isNameFocus, setIsNameFocus] = useState(false)
    const [isEmailFocus, setisEmailFocus] = useState(false)
    const [isPhoneNumberFocus, setIsPhoneNumberFocus] = useState(false)
    const [isMessageFocus, setIsMessageFocus] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [popup, setPopUp] = useState({show: false, type: "", message: ""})
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneNumberRef = useRef()
    const messageRef = useRef()
    const dispatch = useDispatch()
    const { isFormLoading, formError } = useSelector((state) => state.contactForm)
    

    const onNameFocus = () => {
        setIsNameFocus(true)
        nameRef.current.focus()
    }
    const onNameUnfocus = () => {
        if(name.length == 0) {
            setIsNameFocus(false)
        }
    }

    const onEmailFocus = () => {
        setisEmailFocus(true)
        emailRef.current.focus()
    }
    const onEmailUnfocus = () => {
        if(email.length == 0) {
            setisEmailFocus(false)
        }
    }

    const onPhoneNumberFocus = () => {
        setIsPhoneNumberFocus(true)
        phoneNumberRef.current.focus()
    }
    const onPhoneNumberUnFocus = () => {
        if(phoneNumber.length == 0) {
            setIsPhoneNumberFocus(false)
        }
    }

    const onMessageFocus = () => {
        setIsMessageFocus(true)
        messageRef.current.focus()
    }
    const onMessageUnfocus = () => {
        if(message.length == 0) {
            setIsMessageFocus(false)
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = {
                'name': name,
                'email': email,
                'phoneNumber': phoneNumber,
                'message': message
            }
            const response = await dispatch(contactFormThunk(data)).unwrap()
            setPopUp({
                show: true,
                type: SUCCESS,
                message: 'Message sent successfully!'
            })
            console.log('success :', response)
        } catch (error) {
            console.log('failer :', error)
            setPopUp({
                show: true,
                type: FAILED,
                message: 'Failed to send message. Please try again.'
            })
        }

        setTimeout(() => {
            setPopUp({ show: false, type: "", message: "" });
        }, 3000);
    }

  return (
    <div className="relative w-full bg-user-smokewhite px-6 py-24 flex flex-col justify-center items-center gap-y-14">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        ease={80}
        color={"#1e3a32"}
        refresh
      />
      <h1
        className="text-3xl md:text-5xl font-russo font-bold text-gray-900 text-center leading-relaxed "
        data-aos="fade-up"
        data-aos-delay={1 * 100}
      >
        Let's Connect
      </h1>
      <div className="relative w-10/12 lg:w-7/12 flex justify-center items-center">
        <Popup show={popup.show} type={popup.type} message={popup.message} />
        <form className="w-full space-y-12" onSubmit={onFormSubmit}>
          <div className="relative">
            <input
              ref={nameRef}
              className="w-full py-1 px-2  outline-0 border-b-2 border-b-green font-montserrat"
              type="text"
              onFocus={onNameFocus}
              onBlur={onNameUnfocus}
              onChange={(e) => setName(e.target.value)}
            />
            <span
              onClick={onNameFocus}
              className={`absolute left-2 font-montserrat transition-all duration-200 ease-in-out text-gray-600 ${
                isNameFocus ? "-top-3 text-[12px]" : "top-1.5 text-sm"
              }`}
            >
              Name
            </span>
          </div>
          <div className="relative">
            <input
              ref={emailRef}
              className="w-full py-1 px-2 outline-0 border-b-2 border-b-green"
              type="email"
              onFocus={onEmailFocus}
              onBlur={onEmailUnfocus}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span
              onClick={onEmailFocus}
              className={`absolute left-2 font-montserrat transition-all duration-200 ease-in-out text-gray-600 ${
                isEmailFocus ? "-top-3 text-[12px]" : "top-1.5 text-sm"
              }`}
            >
              Email
            </span>
          </div>
          <div className="relative">
            <input
              ref={phoneNumberRef}
              className="w-full py-1 px-2 outline-0 border-b-2 border-b-green"
              type="text"
              onFocus={onPhoneNumberFocus}
              onBlur={onPhoneNumberUnFocus}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <span
              onClick={onPhoneNumberFocus}
              className={`absolute left-2 font-montserrat transition-all duration-200 ease-in-out text-gray-600 ${
                isPhoneNumberFocus ? "-top-3 text-[12px]" : "top-1.5 text-sm"
              }`}
            >
              Phone Number
            </span>
          </div>
          <div className="relative">
            <input
              ref={messageRef}
              className="w-full py-1 px-2 outline-0 border-b-2 border-b-green"
              type="text"
              onFocus={onMessageFocus}
              onBlur={onMessageUnfocus}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span
              onClick={onMessageFocus}
              className={`absolute left-2 font-montserrat transition-all duration-200 ease-in-out text-gray-600 ${
                isMessageFocus ? "-top-3 text-[12px]" : "top-1.5 text-sm"
              }`}
            >
              I Would like to discuss
            </span>
          </div>

          <button
            type="submit"
            className="border-2 border-green py-2 w-full font-montserrat font-semibold text-gray-900 cursor-pointer transition-all duration-300 ease-in hover:bg-green hover:text-user-white"
          >
            
            {
                isFormLoading ? 
                    <ScaleLoader
                        color="#030712"
                        loading={isFormLoading}
                        height={15}
                        width={4}
                    />
                : 
                    "Sent Request"
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm
