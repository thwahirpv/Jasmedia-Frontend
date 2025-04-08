import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";



const PortfolioForm = ({setIsModalOpen, isModalOpen}) => {
    const [fileName, setFileName] = useState("")
    const [image, setImage] = useState("")
    const inputFileRef = useRef(null)

    // Handle file change
    const handleFileChange = (e) => {
        if(e.target && e.target.files.length > 0){
            const file = e.target.files[0]
            setFileName(file.name)
            setImage(URL.createObjectURL(file))
        }
    }

    // Handle file delete
    const HandleFileDelete = () => {
        inputFileRef.current.value = ""
        setFileName("")
        setImage("")
    }
  return (
    <div
    // onClick={() => setIsModalOpen(!isModalOpen)} 
    className={`absolute left-0 right-0 opacity-10 h-screen bg-light-gray-50 dark:bg-dark-blue-100 flex justify-center transition-all overflow-hidden
    ${isModalOpen ? "bottom-0 items-center opacity-100 visible" : "invisible bottom-full"}`}>
      <div className='relative h-fit bg-light-gray-300 dark:bg-dark-blue-900 rounded-md py-6 px-7 flex flex-col items-center space-y-6'>
        <span className='absolute cursor-pointer top-2 right-2 text-light-gray-950 dark:text-dark-white'>
            <IoCloseSharp size={20} onClick={() => setIsModalOpen(!isModalOpen)} />
        </span>
        <h1 className='font-medium text-light-gray-950 dark:text-dark-white' >Add Category</h1>
        <div>
            <form action="" className='flex flex-col space-y-3 w-[300px] md:w-[350px]'>
                <div className='w-full p-2 bg-light-white dark:bg-dark-blue-600 rounded-md'>
                    <div className='w-full h-[200px] flex flex-col justify-center items-center space-y-1 bg-light-white dark:bg-dark-blue-600 rounded-md border-2 border-dashed border-light-gray-950 dark:border-dark-gray'>
                            {
                                image ? 
                                <img className='w-full object-contain' src={image} alt="" />
                                :
                                <div className='w-full h-full flex flex-col justify-center items-center space-y-1'>
                                    <IoCloudUploadOutline size={30} className='text-light-gray-950 hover:text-light-gray-800 dark:text-dark-gray dark:hover:text-dark-white cursor-pointer' 
                                    onClick={() => {
                                        inputFileRef.current.click()
                                    }}/>
                                    <p className='cursor-pointer text-sm md:text-[14.5px] text-light-gray-950 hover:text-light-gray-800 dark:text-dark-gray dark:hover:text-dark-white'
                                    onClick={() => {
                                        inputFileRef.current.click()
                                    }}>
                                        Browse file to Upload File !
                                    </p>
                                </div>
                            }
                    </div>
                </div>
                <div className='flex justify-between items-center bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md px-2 py-1.5'>
                    <AiFillFileImage size={25} 
                    className='text-light-gray-950 hover:text-light-gray-800 cursor-pointer' 
                    onClick={() => {
                        inputFileRef.current.click()
                    }}/>
                    <p className='text-sm text-light-white dark:text-dark-white'>
                        {
                            fileName ? fileName : "Not file selected"
                        }
                    </p>
                    <MdDelete 
                    size={25} className='text-light-gray-950 hover:text-error cursor-pointer' 
                    onClick={HandleFileDelete}/> 
                </div>
                <input 
                className='hidden'
                type="file" 
                ref={inputFileRef}
                onChange={handleFileChange} />
                <input 
                    className='bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1'
                    placeholder='Title'
                    type="text" 
                />
                <textarea 
                    className='bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1'
                    placeholder='Desciption'
                    type="text" 
                />
                <select 
                className='bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1'
                name="" 
                id="" >
                    <option selected value="">Select</option>
                    <option value="">Videography</option>
                    <option value="">Photograpy</option>
                    <option value="">Website</option>
                    <option value="">Audiography</option>
                </select>
                <button className='cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray' type='submit'>Add</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default PortfolioForm
