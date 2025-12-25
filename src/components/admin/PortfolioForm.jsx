import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
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
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ffffff'
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
        background: '#1a1a1a',
        color: '#ffffff'
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

// ... existing code ...

  
  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-agency-black/90 backdrop-blur-sm flex justify-center items-center transition-all duration-300
      ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      {isUploading ? (
        // Uploading preview
        <div className="w-[300px] md:w-[350px] bg-[#1a1a1a] border border-white/10 rounded-2xl flex flex-col items-center p-6 space-y-6 shadow-2xl">
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full h-[200px] bg-black/20 rounded-xl flex items-center justify-center overflow-hidden">
              {Filetype == "Video" ? (
                <video
                  src={mediaURL}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  className="w-full h-full object-contain"
                  src={mediaURL}
                  alt="Upload Preview"
                />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white truncate max-w-[200px]">
                {fileName}
              </p>
              <p className="text-xs text-gray-400">
                {fileSize} MB
              </p>
            </div>
          </div>
          <div className="w-full px-2">
            <div
              className="flex w-full h-2 bg-gray-700 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={uploadingProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="flex flex-col justify-center rounded-full bg-white text-[10px] text-agency-black font-bold text-center whitespace-nowrap transition-all duration-300"
                style={{ width: `${uploadingProgress}%` }}
              >
              </div>
            </div>
            <div className="flex justify-between mt-1">
               <span className="text-xs text-white">{uploadingProgress}%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium animate-pulse">Do not refresh or close tab...</p>
          </div>
          <div className={`${uploadingProgress >= 100 ? 'hidden': 'block'}`}>
            <button className='bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors px-6 py-2 rounded-xl font-bold text-sm'
            onClick={cancelUPload}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Creating form
        <div className="relative w-[90%] max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-2xl">
          <span className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-full">
            <IoCloseSharp
              size={24}
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
          </span>
          <h1 className="text-2xl font-bold font-russo text-white tracking-wide">
            {role === 'create' ? 'Add Project' : 'Edit Project'}
          </h1>
          <div className="w-full">
            <form
              action=""
              className="flex flex-col space-y-5 w-full"
              onSubmit={handleFileSubmit}
            >
              {/* Image Upload Area */}
              <div className="w-full h-[220px] bg-agency-black/50 border-2 border-dashed border-gray-700 hover:border-white rounded-xl transition-colors group relative overflow-hidden flex flex-col justify-center items-center cursor-pointer">
                  {mediaURL ? (
                    Filetype == "Video" ? (
                      <video
                        src={mediaURL}
                        controls
                        className="w-full h-full object-contain z-10"
                      />
                    ) : (
                      <img
                        className="w-full h-full object-contain z-10"
                        src={mediaURL}
                        alt="Preview"
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3 z-10"
                         onClick={() => inputFileRef.current.click()}>
                      <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300">
                         <IoCloudUploadOutline size={30} className="text-white" />
                      </div>
                      <div className="text-center">
                          <p className="text-sm font-bold text-white">Click to upload</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max 800x400px)</p>
                      </div>
                    </div>
                  )}
                 {/* Overlay for change image */}
                 {mediaURL && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center z-20 transition-opacity cursor-pointer"
                         onClick={() => inputFileRef.current.click()}>
                          <span className="text-black font-bold bg-white px-4 py-2 rounded-full backdrop-blur-md">Change File</span>
                    </div>
                 )}
              </div>

              {/* File details & Delete */}
              <div className="flex items-center gap-3">
                 <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <AiFillFileImage size={24} className={file ? "text-white" : "text-gray-600"} />
                    <div className="flex-1 overflow-hidden">
                       <p className="text-sm text-white truncate font-medium">{fileName || "No file selected"}</p>
                       {fileSize > 0 && <p className="text-xs text-gray-500">{fileSize} MB</p>}
                    </div>
                 </div>
                 {file && (
                    <button type="button" onClick={HandleFileDelete} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                        <MdDelete size={20} />
                    </button>
                 )}
              </div>
              {fileError && <p className="text-red-500 text-xs pl-1">{fileError}</p>}
              <input className="hidden" type="file" ref={inputFileRef} onChange={handleFileChange} />

              
              {/* Inputs */}
              <div className="space-y-4">
                  <div className="space-y-1">
                    <input
                      className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                      placeholder="Project Title"
                      type="text"
                      value={title}
                      onChange={titleOnChange}
                    />
                     {titleError && <p className="text-red-500 text-xs pl-1">{titleError}</p>}
                  </div>

                  <div className="space-y-1">
                    <textarea
                      className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all min-h-[100px] resize-none"
                      placeholder="Project Description"
                      type="text"
                      value={discriptoin}
                      onChange={descriptionOnChange}
                      onBlur={descriptionOnChange}
                    />
                     {discriptoinError && <p className="text-red-500 text-xs pl-1">{discriptoinError}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <select
                          className="w-full bg-agency-black/50 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 transition-all appearance-none cursor-pointer"
                          onChange={categoryOnChange}
                          onBlur={categoryOnChange}
                          value={category}
                        >
                          <option value="" disabled>Category</option>
                          {categories.map((item) => (
                              <option key={item._id} value={item._id} className="bg-agency-black">{item.name}</option>
                          ))} 
                        </select>
                         {categoryError && <p className="text-red-500 text-xs pl-1">{categoryError}</p>}
                      </div>

                      <div className="space-y-1">
                        <select
                          className="w-full bg-agency-black/50 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 transition-all appearance-none cursor-pointer"
                          value={select}
                          onChange={TypeOnChange}
                          onBlur={TypeOnChange}
                        >
                          <option value="" disabled>Type</option>
                          <option value="Video" className="bg-agency-black">Video</option>
                          <option value="Image" className="bg-agency-black">Image</option>
                        </select>
                         {typeError && <p className="text-red-500 text-xs pl-1">{typeError}</p>}
                      </div>
                  </div>
              </div>

              <button
                 className="w-full bg-white hover:bg-gray-200 text-agency-black font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer"
                type="submit"
              >
                {role == 'create' ? 'Add Project' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default PortfolioForm;
