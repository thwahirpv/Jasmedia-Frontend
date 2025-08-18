import React, { useEffect, useState } from 'react'
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
                background: theme == 'dark' ? '#2f3946' : '#ecececf5',
                color: theme == 'dark' ? "#ebf1f8" : '#030712'
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
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712'
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
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712'
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
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712'
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
          {
            role == 'create' ? "Add Feedback" : "Edit Feedback"
          }
        </h1>
        <div className='w-full'>
          <form
            action=""
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-0.5">
              {
                nameError ? <p className="text-[11px] text-error">{nameError}</p> 
                :
                <label className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white" htmlFor="category_name">Name</label>
              }
              <input
                id="category_name"
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                type="text"
                value={name}
                onChange={onNameChnage}
              />
              </div>
            <div className="flex flex-col space-y-0.5">
              {
                feedbackError ? <p className="text-[11px] text-error">{feedbackError}</p> 
                :
                <label className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white" htmlFor="category_name">Feedback</label>
              }
              <textarea
                id="category_name"
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                placeholder="Feedback"
                type="text"
                value={feedback}
                onChange={onFeedbackChange}
              />
              </div>
            <div className="flex flex-col space-y-0.5">
              {
                roleError ? <p className="text-[11px] text-error">{roleError}</p> 
                :
                <label className="ml-1 text-[11px] text-light-gray-950 dark:text-dark-white" htmlFor="category_name">Role</label>
              }
              <input
                id="category_name"
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                placeholder="Role"
                type="text"
                value={roleData}
                onChange={onRoleChange}
              />
              </div>
            <button
              className="cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray"
              type="submit"
            >
              {(isCreatePortfolioLoaing || isUpdateFeedbackLoading) ? (
                <ScaleLoader
                  color="#030712"
                  loading={isCreatePortfolioLoaing || isUpdateFeedbackLoading}
                  height={10}
                  width={4}
                />
              ) : (
                role == 'create' ? "Add" : "Edit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm
