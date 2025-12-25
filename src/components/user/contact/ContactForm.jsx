import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { contactFormThunk } from '@/features/auth/ContactFormSlice';
import { ScaleLoader } from 'react-spinners';
import { FAILED, SUCCESS } from '@/constants/constants';
import Popup from './PopUp';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [popup, setPopUp] = useState({show: false, type: "", message: ""})
    
    const dispatch = useDispatch()
    const { isFormLoading } = useSelector((state) => state.contactForm)
    
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
            // Reset form
            setName('')
            setEmail('')
            setPhoneNumber('')
            setMessage('')
            
        } catch (error) {
            console.log('failure :', error)
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
    <div className="relative w-full bg-white px-6 py-24 flex flex-col justify-center items-center">
      
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-green/5 border border-gray-100">
          <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-russo text-agency-black mb-3">Send us a Message</h2>
              <p className="text-gray-500 font-opensans">We'll get back to you within 24 hours.</p>
          </div>

          <Popup show={popup.show} type={popup.type} message={popup.message} />
          
          <form className="space-y-6" onSubmit={onFormSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 font-montserrat">Name</label>
                    <input
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all font-opensans"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 font-montserrat">Phone Number</label>
                    <input
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all font-opensans"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                 </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-montserrat">Email Address</label>
                <input
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all font-opensans"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 font-montserrat">Message</label>
                <textarea
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all font-opensans min-h-[150px] resize-none"
                    placeholder="Tell us about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 bg-agency-black text-white rounded-xl font-bold font-montserrat text-base hover:bg-green transition-colors shadow-lg flex justify-center items-center gap-2"
              disabled={isFormLoading}
            >
              {isFormLoading ? (
                 <ScaleLoader color="#ffffff" height={20} />
              ) : (
                <>
                  Send Message <Send size={20} />
                </>
              )}
            </motion.button>
          </form>
      </div>
    </div>
  );
}

export default ContactForm
