import React, { useEffect, useState } from 'react'
import { listFeedbackThunk } from '../../features/feedback/feedbackList'
import { useDispatch, useSelector } from 'react-redux'
import PuffLoader from 'react-spinners/PuffLoader'
import FeedbackForm from './FeedbackForm'
import { toggleFeedbackThunk } from '../../features/feedback/toggleFeedback'
import { MdDelete } from 'react-icons/md'
import AdminApi from '../../utils/api'
import { deleteFeedbackThunk, clearDeleteFbError } from '../../features/feedback/deleteFeedback'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useTheme from '../../hook/useTheme'
import useDebounce from '../../hook/useDebounce'
import noDataPng from '../../assets/images/no_data.png'
import CategoryPreview from './CategoryPreview'
import FeedbackPreview from './FeedbackPreview'
import { VscPreview } from 'react-icons/vsc'
import { setFeedbackPreview } from '../../features/feedback/feedbackPreview'
import ClipLoader from 'react-spinners/ClipLoader'

const feedbackSwal = withReactContent(Swal)

const FeedbackList = ({isModalOpen, statusSelected, searchTerm}) => {
    const dispatch = useDispatch()
    const [feedbacks, setFeedbacks] = useState([])
    const [isModalopenU, setIsModalOpenU] = useState(false)
    const { isListLoading, isListError } = useSelector((state) => state.feedbackList)
    const { isFbToggleLoading, isFbError } = useSelector((state) => state.toggleFeedback)  
    const [updateData, setUpdateData] = useState({})
    const [theme, setTheme] = useTheme()
    const { isFBDeleteError } = useSelector((state) => state.feedbackDelete)
    const debouncedSearchTerm = useDebounce(searchTerm, 300)
    const { isRootAdmin } = useSelector((state) => state.auth)
    const [isPreview, setIsPreview] = useState(false) 
    const [togglingFeedbackId, setTogglingFeedbackId] = useState(null)

    

    const truncateString = (str, max = 12) => {
      return str?.length > max ? str.slice(0, max) + "..." : str;
    };

    const fetchFeedback = async () => {
      try {
        const response = await dispatch(listFeedbackThunk()).unwrap()
        console.log(response)
        if(statusSelected == 'Active'){
          setFeedbacks(response.filter(item => item.status == true && item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
          return
        }
        else if(statusSelected == 'Deactive'){
          setFeedbacks(response.filter(item => item.status == false && item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
          return 
        } else {
          setFeedbacks(response.filter(item => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
        }
      } catch (error) {
        console.log(error)
      }
    }

    const onEditClick = (feedack) => {
      setUpdateData({
        '_id': feedack._id,
        'name': feedack.name,
        'feedback': feedack.feedback,
        'role':feedack.role
      })
      setIsModalOpenU(!isModalopenU)
    }

    const onFeedbackToggle = async (feedbackId) => {
      setTogglingFeedbackId(feedbackId)
      try {
        const response = await dispatch(toggleFeedbackThunk(feedbackId)).unwrap()
        fetchFeedback()
        return
      } catch (error) {
        feedbackSwal.fire({
          title: "Toggle failed",
          text: `${isFbError}`,
          icon: "error",
          confirmButtonText: "OK",
          background: theme == "dark" ? "#2f3946" : "#ecececf5",
          color: theme == "dark" ? "#ebf1f8" : "#030712",
        });
      } finally {
        setTogglingFeedbackId(null)
      }
    }

    const onDeleteFeedback = async (feedbackId, name) => {
        feedbackSwal.fire({
          title: 'Are you sure ?',
          icon: 'warning',
          text: `Are you sure to delete ${name}`,
          allowOutsideClick: true,
          allowEscapeKey: true,
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonText: 'Not',
          confirmButtonText: 'Sure',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        }).then( async (res) => {
          if(res.isConfirmed) {
            try {
              await dispatch(deleteFeedbackThunk({'feedbackId': feedbackId})).unwrap()
              fetchFeedback()
            } catch (error) {
              feedbackSwal.fire({
                title: "Toggle failed",
                text: `${isFBDeleteError}`,
                icon: "error",
                confirmButtonText: "OK",
                background: theme == "dark" ? "#2f3946" : "#ecececf5",
                color: theme == "dark" ? "#ebf1f8" : "#030712",
              });
            }
          }
        })
    }

    const NavigatePreviwe = (feedback) => {
      console.log(feedback)
      dispatch(setFeedbackPreview(feedback))
      setIsPreview(!isPreview)
    }

    useEffect(() => {
      if(isModalOpen == false || isModalopenU == false){
        fetchFeedback()
      }
    }, [isModalOpen, isModalopenU, statusSelected, debouncedSearchTerm])

  return (
    <div className="w-full h-[80%] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300">
      <table className="relative w-full text-sm text-left rtl:text-right text-light-gray-950 dark:text-dark-white">
        <thead className="sticky top-0 text-xs text-light-gray-950 uppercase bg-light-gray-300 dark:bg-dark-blue-600 dark:text-dark-gray ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Preview
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Feedback
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="relative">
          {isListLoading && (
            <span className="absolute left-[45%] top-[60px]">
              <PuffLoader
                color=""
                className="dark:text-dark-white text-light-gray-800"
                loading={isListLoading}
                height={10}
                width={4}
              />
            </span>
          )}
          {isListError && (
            <p className="text-error text-sm absolute left-[45%] top-[60px]">
              {isListError}
            </p>
          )}
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <tr
                key={feedback._id}
                className="odd:bg-light-white odd:dark:bg-dark-blue-900 even:bg-light-gray-100 even:dark:bg-dark-blue-400 border-b dark:border-dark-blue-300 border-light-gray-100"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                >
                  <p
                    className="cursor-pointer text-light-gray-950 dark:text-dark-white"
                    onClick={() => NavigatePreviwe(feedback)}
                  >
                    <VscPreview size={18} />
                  </p>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                >
                  {feedback.name}
                </td>
                <td className="px-6 py-4">{truncateString(feedback.feedback)}</td>
                <td className="px-6 py-4">
                  {feedback.status ? (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  )}
                </td>
                <td className="flex px-6 py-4 space-x-4">
                  <p
                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500"
                    onClick={() => onEditClick(feedback)}
                  >
                    Edit
                  </p>

                  {isRootAdmin && (
                    <>
                      <p
                        href="#"
                        className={`cursor-pointer font-medium ${
                          feedback.status ? "text-red-500" : "text-green-500"
                        }`}
                        onClick={() => onFeedbackToggle(feedback._id)}
                      >
                        {
                          togglingFeedbackId == feedback._id ? (
                            <ClipLoader
                              color={theme == 'dark' ? "#ebf1f8" : '#030712'}
                              loading={isFbToggleLoading}
                              size={13}
                            />
                          ) : feedback.status ? ("Block") : ("Unblock")
                        }
                      </p>
                      <button
                        className="cursor-pointer text-red-500"
                        onClick={() =>
                          onDeleteFeedback(feedback._id, feedback.name)
                        }
                      >
                        <MdDelete size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <div className="absolute w-fit top-[70px] left-[47%] bg-light-gray-400 dark:bg-dark-blue-300 p-3.5 rounded-full">
              <img className="w-[70px]" src={noDataPng} alt="" />
            </div>
          )}
        </tbody>
      </table>
      <FeedbackForm
        isModalOpen={isModalopenU}
        setIsModalOpen={setIsModalOpenU}
        role={"update"}
        data={updateData}
        setUpdateData={setUpdateData}
      />

      <FeedbackPreview isPreview={isPreview} setIsPreview={setIsPreview} />
    </div>
  );
}

export default FeedbackList
