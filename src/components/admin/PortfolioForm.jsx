import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {
  isEmpty,
  isNotString,
  isNotValidString,
  isNotImage,
  isNotVideo,
  isNotValidFileType,
} from "../../utils/validations";
import { cloudinaryDetails, setCDetailsIsError } from "../../features/portfolio/cloudinaryDetails";
import { useDispatch, useSelector } from "react-redux";
import { uplaodToCloudinary, clearAllUploadData } from "../../features/portfolio/UploadToCloudinary";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useTheme from "../../hook/useTheme";
import { createPortfolio } from "../../features/portfolio/createPortfolio";
import { setIsCreateSuccess, setCreateEror  } from "../../features/portfolio/createPortfolio";
import { listCategory } from "../../features/category/categoryListing";
import { updatePortfolio } from "../../features/portfolio/updatePortfolio";
import { setIsUpdateSuccess, setUpdateError } from "../../features/portfolio/updatePortfolio";



const portfolioSwal = withReactContent(Swal)

const PortfolioForm = ({ setIsModalOpen, isModalOpen, role, data={}, setPortfolioUpdateData }) => {
  const [fileName, setFileName] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");
  const [Filetype, setFileType] = useState("");
  const [fileSize, setFileSize] = useState(0)
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState("");
  const [discriptoin, setDiscription] = useState("");
  const [discriptoinError, setDiscriptoinError] = useState("");
  const [select, setSelect] = useState("")
  const [category, setCategory] = useState("")
  const [categoryError, setCategoryError] = useState("")
  const [categories, setCategories] = useState([])
  const [typeError, setTypeError] = useState("");
  const [theme, setTheme] = useTheme()
  const [portfolioData, setPortfolioData] = useState({})
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const controllerRef = useRef(null)
  const { publicId, signature, signedUrl, timestamp, apiKey, CDetailError, CDetailISError } = useSelector((state) => state.cloudinaryDetials);
  const { isUploading, uploadingError, uploadingProgress, isUploadCancel } = useSelector((state) => state.cloudinaryUpload)
  const { isCreateLoading, createEror, isCreateSuccess } = useSelector((state) => state.createPortfolio)
  const { isUpdatingLoading, isUpdatingSuccess, updateError } = useSelector((state) => state.updatePortfolio)

  // Prevent reload while upload
  useEffect(() => {
    const handleRelaod = (e) => {
      e.preventDefault()
      e.returnValue = 'Do not refresh the page. Your upload will be cancelled.'    
    }

    if(isUploading) {
      window.addEventListener('beforeunload', handleRelaod)
    }else{
      window.removeEventListener('beforeunload', handleRelaod)
    }

    return () => {
      window.removeEventListener('beforeunload', handleRelaod)
    }
  }, [isUploading])

  

  useEffect(() => {
    setFileName('')
    setMediaURL('')
    setFile('')
    setFileType('')
    setFileSize(0)
    setTitle('')
    setDiscription('')
    setSelect('')
    setCategory('')
    setPortfolioData('')
    setIsModalOpen(false)
    dispatch(clearAllUploadData())
    controllerRef.current?.abort()
  }, [])
  

  // For fetch category
  const fetchCategory = async () => {
    try {
      const response = await dispatch(listCategory()).unwrap()
      setCategories(response.category.filter(item => item.status == true))
    }
    catch (error) {
      portfolioSwal.fire({
        title: 'Something wrong!',
        icon: 'error',
        allowOutsideClick: true,
        allowEscapeKey: true,
        showConfirmButton: true,
        confirmButtonText: 'Refresh',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      }).then((res) => {
        window.location.reload()
      })
    }
  }

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        isNotValidFileType(file, [
          "image/jpg",
          "image/png",
          "image/jpeg",
          "video/mp4",
          "video/x-matroska",
          "video/webm",
          "video/x-msvideo",
          "video/mpeg",
        ])
      ) {
        setFileError("Invalid File!");
        return;
      }
      if (file.type.startsWith("image/")) {
        setFileType("Image");
      } else if (file.type.startsWith("video/")) {
        setFileType("Video");
      } else {
        setFileError("Select image or video file.");
        return;
      }
      setFile(file);
      setFileSize((file.size / (1024 * 1024)).toFixed(2))
      setFileName(
        file.name.length > 12 ? file.name.slice(0, 10) + "..." : file.name
      );
      
      setMediaURL(URL.createObjectURL(file));
      setFileError("");
    }
  };

  // Handle file delete
  const HandleFileDelete = () => {
    inputFileRef.current.value = "";
    setFileName("");
    setMediaURL("");
    setFile("");
  };

  const titleOnChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if(isEmpty(value)){
        setTitleError("Title is mandatory!")
    }
    if (isNotString(value)) {
      setTitleError("Invalid Title");
      return;
    }
    if (isNotValidString(value)) {
      setTitleError("Enter valid Title.");
      return;
    }
    setTitleError("");
  };

  const descriptionOnChange = (e) => {
    const value = e.target.value;
    setDiscription(value);
    if (isNotString(value)) {
      setDiscriptoinError("Invalid description.");
      return;
    }
    if (isNotString(value)) {
      setDiscriptoinError("Enter valid description.");
      return;
    }
    if (isNotValidString(value)) {
        setDiscriptoinError("Enter valid Description.");
        return;
    }
    setDiscriptoinError("");
  };

  const categoryOnChange = (e) => {
    const value = e.target.value
    setCategory(value)
    if(isEmpty(value)) {
      setCategoryError('Categor is mandatory!')
      return
    }
    if(isNotString(value)){
      setCategoryError('Select a valid Category!')
      return
    }
    if(isNotValidString(value)){
      setCategoryError('Select a valid Category!')
      return
    }
    setCategoryError('')
  }


  const TypeOnChange = (e) => {
    const value = e.target.value;
    setSelect(value)
    if (value == "Image") {
      if (isNotImage(file)) {
        setTypeError("The selected file is not a valid image!");
        return;
      }
    } else if (value == "Video") {
      if (isNotVideo(file)) {
        setTypeError("The selected file is not a valid video!");
        return;
      }
    }
    setTypeError("");
  };

  // For create portfolio 
  const createInstance = async (portfolioData) => {
    try {
      const createData = {
        'portfolio': portfolioData
      }
      const res = await dispatch(createPortfolio(createData)).unwrap()
    } catch (error) {
      console.log(error, 'from front end')
    }
  } 

  const updateInstace = async (portfolioData) => {
    try {
      const updateData = {
        '_id': data._id,
        'portfolio': portfolioData
      }
      const res = await dispatch(updatePortfolio(updateData)).unwrap()
    } catch (error) {
      console.log(error, 'from update instace front end')
    }
  }

  
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    // Final validation 
    // File validation
    if(!file && !role == 'update'){
        setFileError("Select file!")
        return 
    }

    // Title validatoin 
    if(isEmpty(title)){
        setTitleError("Title is mandatory!")
        return
    }
    if (isNotValidString(title)) {
        setTitleError("Enter valid Title.");
        return;
      }

    // description validation
      // if(discriptoin){
      //     if (isNotValidString(discriptoin)) {
      //         setDiscriptoinError("Enter valid Description.");
      //         return;
      //     }
      // }

    // File type validatoin
    if(isEmpty(select)){
        setTypeError("Select file type!")
        return 
    }
    if (select === "Image") {
        if (isNotImage(file)) {
          setTypeError("The selected file is not a valid image!");
          return;
        }
    } else if (select === "Video") {
        if (isNotVideo(file)) {
          setTypeError("The selected file is not a valid video!");
          return;
        }
    }

    controllerRef.current = new AbortController()

    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('api_key', apiKey)
        formData.append('signature', signature)
        formData.append('public_id', publicId)
        formData.append('timestamp', timestamp)
        const data = {
          "signedUrl": signedUrl,
          "formData": formData
        }
        let response = null
        if(file){
          response = await dispatch(uplaodToCloudinary(data, {signal: controllerRef.current.signal})).unwrap()
        }
        const portfolio = {
          'title': title, 
          'description': discriptoin,
          'type': Filetype,
          'category': category,
          'publicId': publicId,
          'secureUrl': response?.secure_url || data?.secureUrl
        }
        
        setPortfolioData(portfolio)
        setIsModalOpen(!isModalOpen)
        if(role == 'create'){
          await createInstance(portfolio)
        }
        else if(role == 'update'){
          await updateInstace(portfolio)
        }
    } catch (error) {
      console.log(error, 'from front error')
    }
  };

  const cancelUPload = () => {
    controllerRef.current?.abort()
  }

  // For getting Cloudinary credentials
  const fetchCloudinaryCredentials = async () => {
    if (file) {
      try {
        const response = await dispatch(cloudinaryDetails()).unwrap();
        console.log(response)
        return
      } catch (error) {
        console.log('from front')
        console.log(CDetailError);
      }
    }
  };
  useEffect(() => {
    if (file) {
      fetchCloudinaryCredentials();
    }
  }, [file]);

  // It's error popup for when get error from fetchCloudinaryCredentials
  useEffect(() =>{
    if(CDetailISError == true){
      portfolioSwal.fire({
        title: CDetailError,
        icon: 'error',
        text: 'Please Check you internet!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: 'Checked',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      }).then((res) => {
        if(res.isConfirmed){
          dispatch(setCDetailsIsError())
          fetchCloudinaryCredentials()
        }
      })
    }

    // It's loading pop for while creating portfolio
    if (isCreateLoading || isUpdatingLoading) {
      portfolioSwal.fire({
        text: 'Please wait',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          portfolioSwal.showLoading(); 
        },
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712'
      })
    }

    // It's a Success popup while for portfolio created
    if (isCreateSuccess){
      portfolioSwal.fire({
        title: `${Filetype} saved`,
        icon: 'success',
        allowOutsideClick: true,
        allowEscapeKey: true,
        showConfirmButton: true,
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712'
      }).then((res) => {
        dispatch(setIsCreateSuccess())
        setFileName('')
        setMediaURL('')
        setFile('')
        setFileType('')
        setFileSize(0)
        setTitle('')
        setDiscription('')
        setSelect('')
        setCategory('')
        setPortfolioData('')
      })
    }

    // It's error popup for portfolio create error
    if (createEror) {
      portfolioSwal.fire({
        title: createEror,
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Retry',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#f60013',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      }).then((res) => {
        if(res.isConfirmed){
            createInstance(portfolioData)
        }
        else if(res.isDismissed){
          dispatch(setCreateEror())
        }
      })
    }

    // Its success popup for update portfolio
    if (isUpdatingSuccess){
      portfolioSwal.fire({
        title: `${Filetype} Updated`,
        icon: 'success',
        allowOutsideClick: true,
        allowEscapeKey: true,
        showConfirmButton: true,
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712'
      }).then((res) => {
        dispatch(setIsUpdateSuccess())
        setFileName('')
        setMediaURL('')
        setFile('')
        setFileType('')
        setFileSize(0)
        setTitle('')
        setDiscription('')
        setSelect('')
        setCategory('')
        setPortfolioData('')
      })
    }

    // Its a error popup for update portfolio
    if (updateError) {
      portfolioSwal.fire({
        title: updateError,
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Retry',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#f60013',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      }).then((res) => {
        if(res.isConfirmed){
            updateInstace(portfolioData)
        }
        else if(res.isDismissed){
          dispatch(setUpdateError())
        }
      })
    }

    if(isUploadCancel == true) {
      portfolioSwal.fire({
        title: 'Upload cancelled',
        text: 'The file upload was cancelled.',
        icon: 'info',
        timer: 2000, 
        showConfirmButton: false,
        timerProgressBar: true, 
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712'
      }).then((res) => {
        setFileName('')
        setMediaURL('')
        setFile('')
        setFileType('')
        setFileSize(0)
        setTitle('')
        setDiscription('')
        setSelect('')
        setCategory('')
        setPortfolioData('')
        setIsModalOpen(false)
        dispatch(clearAllUploadData())
      })
    }
  }, [CDetailISError, isCreateSuccess, isCreateLoading, createEror, isUpdatingLoading, isUpdatingSuccess, updateError, isUploadCancel])

  useState(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    if (role === 'update' && data && Object.keys(data).length > 0) {
      console.log(data, 'from data setup')
      setTitle(data.title || '')
      setDiscription(data.description || '')
      setCategory(data.category || '')
      setSelect(data.type || '')
      setFileType(data.type || '')
    }
}, [data, role])

  return (
    <div
      // onClick={() => setIsModalOpen(!isModalOpen)}
      className={`absolute left-0 right-0 opacity-10 h-screen bg-light-gray-50 dark:bg-dark-blue-100 flex justify-center transition-all overflow-hidden
    ${
      isModalOpen
        ? "bottom-0 items-center opacity-100 visible"
        : "invisible bottom-full"
    }`}
    >
      {isUploading ? (
        // Uplaoding preview
        <div className="w-[300px] md:w-[350px] h-fit bg-light-gray-300 dark:bg-dark-blue-900 rounded-md flex flex-col items-center p-4 space-y-4">
          <div className="w-full flex flex-col items-center space-y-2">
            <div className="w-full h-[200px]">
              {Filetype == "Video" ? (
                <video
                  src={mediaURL}
                  controls
                  className="w-full h-full rounded object-contain shadow-md"
                />
              ) : (
                <img
                  className="w-full h-full object-contain rounded-md"
                  src={mediaURL}
                  alt=""
                />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-light-gray-950 dark:text-dark-white">
                {mediaURL}
              </p>
              <p className="text-sm text-light-gray-950 dark:text-dark-gray">
                {fileSize}
              </p>
            </div>
          </div>
          <div className="w-full mt-1 px-7">
            <div
              className="flex w-full h-3 bg-gray-300 rounded-full overflow-hidden dark:bg-dark-blue-300"
              role="progressbar"
              aria-valuenow={uploadingProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap dark:bg-blue-500 transition duration-500 text-[10px] font-semibold"
                style={{ width: `${uploadingProgress}%` }}
              >
                {uploadingProgress}%
              </div>
            </div>
            {/* <div className="w-full flex justify-center">
              <img className="w-[60px]" src={upload_complete} alt="" />
            </div> */}
          </div>
          <div>
            <p className="text-gray-700 dark:text-dark-blue-300 text-sm font-medium">Please do not refresh or close the tab</p>
          </div>
          <div className={`mt-2 ${uploadingProgress >= 100 ? 'hidden': 'block'}`}>
            <button className='bg-error p-1 px-4 rounded-md font-semibold cursor-pointer text-dark-blue-900'
            onClick={cancelUPload}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Creating form
        <div className="relative h-fit bg-light-gray-300 dark:bg-dark-blue-900 rounded-md py-7 px-7 flex flex-col items-center space-y-6">
          <span className="absolute cursor-pointer top-2 right-2 text-light-gray-950 dark:text-dark-white">
            <IoCloseSharp
              size={20}
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
          </span>
          <h1 className="font-medium text-light-gray-950 dark:text-dark-white">
            Add Portfolio
          </h1>
          <div>
            <form
              action=""
              className="flex flex-col space-y-4 w-[300px] md:w-[350px]"
              onSubmit={handleFileSubmit}
            >
              <div className="w-full p-2 bg-light-white dark:bg-dark-blue-600 rounded-md">
                <div className="w-full h-[200px] flex flex-col justify-center items-center space-y-1 bg-light-white dark:bg-dark-blue-600 rounded-md border-2 border-dashed border-light-gray-950 dark:border-dark-gray">
                  {mediaURL ? (
                    Filetype == "Video" ? (
                      <video
                        src={mediaURL}
                        controls
                        className="w-full h-full rounded object-contain shadow-md"
                      />
                    ) : (
                      <img
                        className="w-full h-full object-contain rounded-md"
                        src={mediaURL}
                        alt=""
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
                      <IoCloudUploadOutline
                        size={30}
                        className="text-light-gray-950 hover:text-light-gray-800 dark:text-dark-gray dark:hover:text-dark-white cursor-pointer"
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                      />
                      <p
                        className="cursor-pointer text-sm md:text-[14.5px] text-light-gray-950 hover:text-light-gray-800 dark:text-dark-gray dark:hover:text-dark-white"
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                      >
                        Browse file to Upload File !
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                {fileError && (
                  <p className="text-error text-[12px]">{fileError}</p>
                )}
                <div className="flex justify-between items-center bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md px-2 py-1.5 space-x-2">
                  <AiFillFileImage
                    size={25}
                    className={`text-light-gray-950 hover:text-light-gray-800 hover:dark:text-dark-blue-900 ${
                      file ? "cursor-no-drop" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!file) {
                        inputFileRef.current.click();
                      }
                    }}
                  />
                  <div className="w-full flex flex-col items-center space-y-0.5">
                    <p className="text-[12px] text-light-gray-950 dark:text-dark-white">
                      {fileName ? fileName : "Not file selected"}
                    </p>
                  </div>
                  <MdDelete
                    size={25}
                    className="text-light-gray-950 hover:text-error cursor-pointer"
                    onClick={HandleFileDelete}
                  />
                </div>
              </div>
              <input
                className="hidden"
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              <div className="flex flex-col w-full">
                {titleError && (
                  <p className="text-error text-[12px]">{titleError}</p>
                )}
                <input
                  className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1"
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={titleOnChange}
                  // onBlur={titleOnChange}
                />
              </div>
              <div className="flex flex-col w-full">
                {discriptoinError && (
                  <p className="text-error text-[12px]">{discriptoinError}</p>
                )}
                <textarea
                  className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1"
                  placeholder="Desciption"
                  type="text"
                  value={discriptoin}
                  onChange={descriptionOnChange}
                  onBlur={descriptionOnChange}
                />
              </div>

              <div className="flex flex-col w-full">
                {typeError && (
                  <p className="text-error text-[12px]">{typeError}</p>
                )}
                <select
                  className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1"
                  name=""
                  onChange={categoryOnChange}
                  onBlur={categoryOnChange}
                  id=""
                >
                  <option defaultValue={true} value={`${category._id || ''}`}>
                    {category.name || 'Category'}
                  </option>
                  {
                    categories.map((item, index) => (
                      <option key={item._id} value={`${item._id}`}>{item.name}</option>
                  ))} 
                </select>
              </div>

              <div className="flex flex-col w-full">
                {typeError && (
                  <p className="text-error text-[12px]">{typeError}</p>
                )}
                <select
                  className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 px-2 py-1"
                  name=""
                  value={select}
                  onChange={TypeOnChange}
                  onBlur={TypeOnChange}
                  id=""
                >
                  <option defaultValue={true} value="">
                    Type
                  </option>
                  <option value="Video">Video</option>
                  <option value="Image">Image</option>
                </select>
              </div>
              <button
                className="cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray"
                type="submit"
              >
                {
                  role == 'create' ? 'Add' : 'Edit'
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioForm;
