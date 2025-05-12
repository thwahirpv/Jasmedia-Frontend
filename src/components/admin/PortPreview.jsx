import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PuffLoader from "react-spinners/PuffLoader";
import noContentImage from '../../assets/images/no_data.png'
import { IoClose } from "react-icons/io5";
import { clearPortfolioPreview } from '../../features/portfolio/portfolioPreview';



const PortPreview = ({isPreview, setIsPreview}) => {
    const {title, description, type, category, status, contentLink, createdAt, updatedAt, publicId} = useSelector((state) => state.portfolioPreview)
    const [isContentLoading, setIsContentLoading] = useState(true)
    const dispatch = useDispatch()

    const closePreview = () => {
      setIsPreview(false)
      dispatch(clearPortfolioPreview())
    }
  return (
    <div className={`absolute left-0 right-0 opacity-10 h-screen py-10 transition-all overflow-hidden
    ${
        isPreview
        ? "bottom-0 items-center opacity-100 visible"
        : "invisible bottom-full"
    }`}>

        <div className='relative w-full h-full bg-light-white dark:bg-dark-blue-600 rounded-md flex flex-col items-center
        overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300'>
          {/* close icon */}
            <div 
            className='absolute text-light-gray-950 dark:text-dark-white top-4 right-4 cursor-pointer'
            onClick={closePreview}
            >
              <IoClose size={20} />
            </div>
            {/* title */}
            <div className='py-6'>
                <h1 className='text-lg md:text-2xl font-medium text-light-gray-950 dark:text-dark-white'>{title}</h1>
            </div>

            {/* content */}
            <div className='w-[60%] md:w-[40%] h-[250px] rounded-md bg-light-gray-50 flex justify-center items-center'>
            {
              contentLink ? 
              type == "Video" ? (
                <video
                  src={contentLink}
                  controls
                  className="w-full h-full rounded object-contain shadow-md"
                />
              ) : (
                <img
                  className="w-full h-full object-contain rounded-md"
                  onLoad={() => setIsContentLoading(false)}
                  src={contentLink}
                  alt=""
                />
              )
              :
              <img className="w-[100px] rounded-md"
                src={noContentImage} 
              />
            }
            </div>

            {/* description  and other details*/}
            <div className='w-full flex flex-col md:flex-row items-center md:justify-around py-[60px] px-3 space-y-5 md:space-y-0'>
              <div className='bg-light-gray-50 dark:bg-dark-blue-400 w-[300px] md:w-[350px] h-[200px] rounded-md p-3 space-y-2 text-wrap 
              overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300'>
                <h4 className='text-light-gray-950 dark:text-dark-white'>Description</h4>
                <p className='text-light-gray-950 dark:text-dark-gray'>{description}</p>
              </div>
              <div className='flex justify-around items-center bg-light-gray-50 dark:bg-dark-blue-400 w-[300px] md:w-[350px] h-[200px] rounded-md p-3'>
                <div className='space-y-0.5'>
                    <p className='text-light-gray-950 dark:text-dark-white'>Category</p>
                    <p className='text-light-gray-950 dark:text-dark-white'>Status</p>
                    <p className='text-light-gray-950 dark:text-dark-white'>Create at</p>
                    <p className='text-light-gray-950 dark:text-dark-white'>Last update</p>
                </div>
                <div className='space-y-1.5'>
                    <p className='text-light-gray-950 dark:text-dark-gray text-sm'>{category}</p>
                    <p className={`${status ? 'text-green-500' : 'text-error' } text-sm`}>{status ? "Active" : 'Deactive'}</p>
                    <p className='text-light-gray-950 dark:text-dark-gray text-sm'>{createdAt}</p>
                    <p className='text-light-gray-950 dark:text-dark-gray text-sm'>{updatedAt}</p>
                </div>
              </div>
            </div>
        </div>
        
    </div>
  )
}

export default PortPreview
