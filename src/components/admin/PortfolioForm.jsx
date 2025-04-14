import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { isString, isEmpty, isNumber, isNotString, isNotValidString, isNotImage, isNotVideo, isNotValidFileType } from '../../utils/validations';
import useDebounce from '../../hook/useDebounce';




const PortfolioForm = ({setIsModalOpen, isModalOpen}) => {
    const [fileName, setFileName] = useState("")
    const [image, setImage] = useState("")
    const [file, setFile] = useState("")
    const [fileError, setFileError] = useState("")
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")
    const [discriptoin, setDiscription] = useState("")
    const [discriptoinError, setDiscriptoinError] = useState("")
    const [type, setType] = useState("")
    const [typeError, setTypeError] = useState("")
    const inputFileRef = useRef(null)

    // Handle file change
    const handleFileChange = (e) => {
        if(e.target && e.target.files.length > 0){
            const file = e.target.files[0]
            if(isNotValidFileType(file, ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4', 'video/x-matroska' ])){
                setFileError("Invalid File!")
                return 
            }
            setFile(file)
            setFileError("")
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

    const titleOnChange = (e) => {
        const value = e.target.value
        if(isNotString(value)){
            setTitleError('Invalid Title')
            return 
        }
        if(isNumber(value)) {
            setTitleError('Only numbers is not allowed!')
            return
        }
        if(isNotValidString(value)){
            setTitleError('Enter valid Title.')
            return
        }
        setTitle(value)
        setTitleError("")
    }

    const descriptionOnChange = (e) => {
        const value = e.target.value
        if(isNotString(value)){
            setDiscriptoinError("Invalid description.")
            return 
        }
        if(isNumber(value)){
            setDiscriptoinError("Only number is not allowed!")
            return 
        }
        if(isNotString(value)){
            setDiscriptoinError("Enter valid description.")
            return
        }
        setDiscription(value)
        setDiscriptoinError("")
    }

    const TypeOnChange = (e) => {
        const value = e.target.value
        if (value == 'image'){
            if(isNotImage(file)){
                setTypeError("The selected file is not a valid image!")
                return
            }
        }
        else if(value == 'video'){
            if(isNotVideo(file)){
                setTypeError("The selected file is not a valid video!")
                return 
            }
        }
        setTypeError("")
    }



    const handleFileSubmit = (e) => {
        e.preventDefault()

        // validation 

    }
  return (
    <div
    // onClick={() => setIsModalOpen(!isModalOpen)} 
    className={`absolute left-0 right-0 opacity-10 h-screen bg-light-gray-50 dark:bg-dark-blue-100 flex justify-center transition-all overflow-hidden
    ${isModalOpen ? "bottom-0 items-center opacity-100 visible" : "invisible bottom-full"}`}>
      <div className='relative h-fit bg-light-gray-300 dark:bg-dark-blue-900 rounded-md py-7 px-7 flex flex-col items-center space-y-6'>
        <span className='absolute cursor-pointer top-2 right-2 text-light-gray-950 dark:text-dark-white'>
            <IoCloseSharp size={20} onClick={() => setIsModalOpen(!isModalOpen)} />
        </span>
        <h1 className='font-medium text-light-gray-950 dark:text-dark-white' >Add Category</h1>
        <div>
            <form action="" className='flex flex-col space-y-4 w-[300px] md:w-[350px]' onSubmit={handleFileSubmit}>
                <div className='w-full p-2 bg-light-white dark:bg-dark-blue-600 rounded-md'>
                    <div className='w-full h-[200px] flex flex-col justify-center items-center space-y-1 bg-light-white dark:bg-dark-blue-600 rounded-md border-2 border-dashed border-light-gray-950 dark:border-dark-gray'>
                            {
                                image ? 
                                <img className='w-full h-full object-contain rounded-md' src={image} alt="" />
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
                <div className='flex flex-col w-full'>
                    {
                        fileError && <p className='text-error text-[12px]'>{fileError}</p>
                    }
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
                </div>
                <input 
                className='hidden'
                type="file" 
                ref={inputFileRef}
                onChange={handleFileChange} />
                <div className='flex flex-col w-full'>
                    {
                        titleError && <p className='text-error text-[12px]'>{titleError}</p>
                    }
                    <input 
                        className='bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1'
                        placeholder='Title'
                        type="text" 
                        onChange={titleOnChange}
                        onBlur={() => {
                            setTitleError("")
                        }}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    {
                        discriptoinError && <p className='text-error text-[12px]'>{discriptoinError}</p>
                    }
                    <textarea 
                        className='bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1'
                        placeholder='Desciption'
                        type="text" 
                        onChange={descriptionOnChange}
                        onBlur={() => {
                            setDiscriptoinError("")
                        }}
                    />
                </div>
                
                <div className='flex flex-col w-full'>
                    {
                        typeError && <p className='text-error text-[12px]'>{typeError}</p>
                    }
                    <select 
                    className='bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1'
                    name="" 
                    onChange={TypeOnChange}
                    onBlur={() => {
                        setTypeError("")
                    }}
                    id="" >
                        <option selected value="">Select</option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                    </select>
                </div>
                <button className='cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray' type='submit'>Add</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default PortfolioForm
