import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { IoCloseSharp } from 'react-icons/io5';
import { isEmpty, isNotString, isNotValidString } from '../../utils/validations';
import { useSelector, useDispatch } from 'react-redux';
import { createFeedbackThunk, setFeedbackSuccess, clearFeedbackError } from '../../features/feedback/createFeedback';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ScaleLoader from 'react-spinners/ScaleLoader';
import useTheme from '../../hook/useTheme';
import { updateFeedbackThunk, setUpdateFbError, setupdateFbSuccess } from '../../features/feedback/updateFeedback';

const feedbackSwal = withReactContent(Swal)

const FeedbackForm = ({isModalOpen, setIsModalOpen, role, data={}, setUpdateData}) => {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [feedback, setFeedback] = useState('')
    const [feedbackError, setFeedbackError] = useState('')
    const [roleData, setRoleData] = useState('')
    const [roleError, setRoleError] = useState('')
    const [feedBackFormData, setFeedBackFormData] = useState({})
    const [theme, setTheme] = useTheme()
    const dispatch = useDispatch()
    const { isCreatePortfolioLoaing, isCreatePortfolioError, isCreatePortfolioSuccess } = useSelector((state) => state.feedbackCreate)
    const { isUpdateFeedbackLoading, isUpdateFeedbackError, isUpdateFeedbackSuccess }  = useSelector((state) => state.feedbackUpdate)

    // Name vlaidation 
    const onNameChnage = (e) => {
        const value = e.target.value
        setName(value)
        if(isEmpty(value)){
            setNameError('Name is required!')
            return 
        }
        if(isNotString(value)){
            setNameError('Enter valid name!')
            return 
        }
        if(isNotValidString(value)){
            setNameError('Enter valid name!')
            return 
        }
        setNameError('')
    }

    // Feedback validation
    const onFeedbackChange = (e) => {
        const value = e.target.value
        setFeedback(value)
        if(isEmpty(value)){
            setFeedbackError('Feedback is required!')
            return 
        }
        if(isNotString(value)){
            setFeedbackError('Enter valid Feedback!')
            return 
        }
        setFeedbackError('')
    }
    const onRoleChange = (e) => {
        const value = e.target.value
        setRoleData(value)
        if(isEmpty(value)){
            setRoleError('Role is required!')
            return 
        }
        if(isNotString(value)){
            setRoleError('Enter valid Role!')
            return 
        }
        if(isNotValidString(value)){
            setRoleError('Enter valid Role!')
            return 
        }
        setRoleError('')
    }

    // Create feedback
    const createFeedback = async (feedbackData) => {
        try {
            const data = {
                'feedback': feedbackData
            }
            const response = await dispatch(createFeedbackThunk(data)).unwrap()
            return response
        } catch (error) {
            console.log(error, 'from frond')
        }
    }

    const updateFeedback = async (updataData) => {
      try {
          const dataUpdate = {
              'feedback': updataData
          }
          const response = await dispatch(updateFeedbackThunk(dataUpdate)).unwrap()
          return response
      } catch (error) {
          console.log(error, 'from frond')
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Final validation 

        // For name 
        if(isEmpty(name)){
            setNameError('Name is required!')
            return 
        }
        if(isNotString(name)){
            setNameError('Enter valid name!')
            return 
        }
        if(isNotValidString(name)){
            setNameError('Enter valid name!')
            return 
        }

        // For feedback
        if(isEmpty(feedback)){
            setFeedbackError('Feedback is required!')
            return 
        }
        if(isNotString(feedback)){
            setFeedbackError('Enter valid Feedback!')
            return 
        }   


        if(role == 'create') {
          const feedbackData = {
            'name':name,
            'feedback': feedback,
            'role': roleData
          }
          setFeedBackFormData(feedbackData)
          await createFeedback(feedbackData)
        }
        else if (role == 'update') {
          const feedbackData = {
            '_id': data._id,
            'name':name,
            'feedback': feedback,
            'role': roleData
          }
          setFeedBackFormData(feedbackData)
          await updateFeedback(feedbackData)
        }
        return 
    }


    useEffect(() => {
        if(isCreatePortfolioSuccess) {
            feedbackSwal.fire({
                title: 'Feedback Saved',
                icon: 'success',
                allowOutsideClick: true,
                allowEscapeKey: true,
                showConfirmButton: true,
                background: '#1a1a1a',
                color: '#ffffff',
                confirmButtonColor: '#ffffff'
            }).then((res) => {
                setName('')
                setFeedback('')
                setRoleData('')
                setFeedBackFormData({})
                setIsModalOpen(false)
                dispatch(setFeedbackSuccess())
                dispatch(clearFeedbackError())
            })
        }

        if(isCreatePortfolioError) {
          feedbackSwal.fire({
            title: 'Failed!',
            text: isCreatePortfolioError,
            icon: 'error',
            allowOutsideClick: true,
            allowEscapeKey: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Try again',
            cancelButtonText: 'Cancel',
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#ffffff'
          }).then((res) => {
              if(res.isConfirmed) {
                createFeedback(feedBackFormData)
              }else{
                console.log('its cancelled')
                setName('')
                setFeedback('')
                setRoleData('')
                setFeedBackFormData({})
                setIsModalOpen(false)
                dispatch(setFeedbackSuccess())
                dispatch(clearFeedbackError())
              }
          })
        }

        if(isUpdateFeedbackSuccess) {
          feedbackSwal.fire({
            title: 'Feedback Updated',
            icon: 'success',
            allowOutsideClick: true,
            allowEscapeKey: true,
            showConfirmButton: true,
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#ffffff'
          }).then((res) => {
              setName('')
              setFeedback('')
              setRoleData('')
              setFeedBackFormData({})
              setIsModalOpen(false)
              setUpdateData({})
              dispatch(setupdateFbSuccess())
              dispatch(setUpdateFbError())
          })
        }

        if(isUpdateFeedbackError) {
          feedbackSwal.fire({
            title: 'Update failed!',
            text: isUpdateFeedbackError,
            icon: 'error',
            allowOutsideClick: true,
            allowEscapeKey: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Try again',
            cancelButtonText: 'Cancel',
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#ffffff'
          }).then((res) => {
              if(res.isConfirmed) {
                updateFeedback(data)
              }else{
                setName('')
                setFeedback('')
                setRoleData('')
                setFeedBackFormData({})
                setIsModalOpen(false)
                dispatch(setupdateFbSuccess())
                dispatch(setUpdateFbError())
              }
          })
        }
    }, [isCreatePortfolioSuccess, isCreatePortfolioError, isUpdateFeedbackSuccess, isUpdateFeedbackError])

    useEffect(() => {
        if (role === 'update' && data && Object.keys(data).length > 0) {
          setName(data.name || '')
          setFeedback(data.feedback || '')
          setRoleData(data.role || '')
        }
    }, [data, role])

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
          {
            role == 'create' ? "Add Feedback" : "Edit Feedback"
          }
        </h1>
        <div className='w-full'>
          <form
            action=""
            className="flex flex-col space-y-5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="space-y-1">
              {
                nameError ? <p className="text-red-500 text-xs pl-1">{nameError}</p> 
                :
                null
              }
              <input
                id="name"
                className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                type="text"
                placeholder="Client Name"
                value={name}
                onChange={onNameChnage}
              />
              </div>
            
            <div className="space-y-1">
              {
                roleError ? <p className="text-red-500 text-xs pl-1">{roleError}</p> 
                :
                null
              }
              <input
                id="role"
                className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                placeholder="Role / Designation"
                type="text"
                value={roleData}
                onChange={onRoleChange}
              />
              </div>

            <div className="space-y-1">
              {
                feedbackError ? <p className="text-red-500 text-xs pl-1">{feedbackError}</p> 
                :
                null
              }
              <textarea
                id="feedback"
                className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all min-h-[100px] resize-none"
                placeholder="Feedback Message"
                type="text"
                value={feedback}
                onChange={onFeedbackChange}
              />
              </div>

            <button
               className="w-full bg-white hover:bg-gray-200 text-agency-black font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer"
              type="submit"
            >
              {(isCreatePortfolioLoaing || isUpdateFeedbackLoading) ? (
                <ScaleLoader
                  color="#000000"
                  loading={isCreatePortfolioLoaing || isUpdateFeedbackLoading}
                  height={15}
                  width={4}
                />
              ) : (
                role == 'create' ? "Add Feedback" : "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default FeedbackForm
