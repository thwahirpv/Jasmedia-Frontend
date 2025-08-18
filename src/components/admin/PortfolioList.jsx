import React, { useEffect, useState } from "react";
import Category from "../../pages/admin/Category";
import default_no_image from "../../assets/images/no_picture_image.jpg";
import { portfolioListThunk } from "../../features/portfolio/portfolioList";
import { useSelector, useDispatch } from "react-redux";
import PortfolioForm from "./PortfolioForm";
import useDebounce from "../../hook/useDebounce";
import { portfolioToggleThunk } from "../../features/portfolio/portfolioToggle";
import { MdDelete } from "react-icons/md";
import { portfolioDeleteThunk } from "../../features/portfolio/portfolioDelete";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setPortfolioError } from "../../features/portfolio/portfolioDelete";
import useTheme from "../../hook/useTheme";
import noDataPng from '../../assets/images/no_data.png'
import { Navigate, useNavigate} from 'react-router-dom'
import { setportfolioPreview, clearPortfolioPreview } from "../../features/portfolio/portfolioPreview";
import PortPreview from "./PortPreview";
import { VscPreview } from "react-icons/vsc";
import ClipLoader from "react-spinners/ClipLoader";



const portfolioSwal = withReactContent(Swal)


const PortfolioList = ({ setIsModalOpen, isModalOpen, statusSelected, searchTerms, categorySelected }) => {
  const dispatch = useDispatch();
  const [portfolios, setPortfolios] = useState([]);
  const [isModalOpenU, setIsModalOpenU] = useState(false);
  const [portfolioData, setPortfolioData] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerms, 300)
  const { isPortfolioDeleteLoading, portfolioDeleteError } = useSelector((state) => state.portfolioDelete)
  const { isportfolioToogleLoading, portfolioToggleError } = useSelector((state) => state.togglePortfolio)
  const [theme, setTheme] = useTheme()
  const navigate = useNavigate()
  const [isPreview, setIsPreview] = useState(false)
  const { isRootAdmin } = useSelector((state) => state.auth)
  const [togglingPortfolioId, setTogglingPortfolioId] = useState(null)
  
  
  const NavigatePreviwe = (portfolio) =>{
    dispatch(setportfolioPreview(portfolio))
    setIsPreview(!isPreview)
  }

  const fetchPortfolioList = async () => {
    try {
      const response = await dispatch(portfolioListThunk()).unwrap();
      if(statusSelected == 'Active'){
        setPortfolios(response.filter(item => item.status == true && (categorySelected ? item.category._id == categorySelected : true) && item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
        return
      }
      else if(statusSelected == 'Deactive'){
        setPortfolios(response.filter(item => item.status == false && (categorySelected ? item.category._id == categorySelected : true) && item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
        return
      } else {
        setPortfolios(response.filter(item => (categorySelected ? item.category._id == categorySelected : true) && item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
        return
      }
    } catch (error) {
      console.log(error, "from front error");
    }
  };

 
  const portfolioToggle = async (portfolio_id) => {
    setTogglingPortfolioId(portfolio_id)
    try { 
      await dispatch(portfolioToggleThunk({'portfolioId': portfolio_id})).unwrap()
      fetchPortfolioList()
    } catch (error) {
      portfolioSwal.fire({
        title: 'Toggle failed',
        text: `${portfolioToggleError}`,
        icon: 'error',
        confirmButtonText: 'OK',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      });
    } finally {
      setTogglingPortfolioId(null)
    }
  }

  const portfolioDelete = async (portfolio_id, title) => {
      portfolioSwal.fire({
        title: 'Are you sure ?',
        icon: 'warning',
        text: `Are you sure to delete ${title}`,
        allowOutsideClick: true,
        allowEscapeKey: true,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Not',
        confirmButtonText: 'Sure',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      }).then(async (res) => {
        try{
          if(res.isConfirmed){
            await dispatch(portfolioDeleteThunk({portfolioId: portfolio_id})).unwrap()
            fetchPortfolioList()
          }
        } catch (error) {
          portfolioSwal.fire({
            title: 'Delete failed',
            text: `${portfolioDeleteError}`,
            icon: 'error',
            confirmButtonText: 'OK',
            background: theme == 'dark' ? '#2f3946' : '#ecececf5',
            color: theme == 'dark' ? "#ebf1f8" : '#030712',
          })
        }
      })
  }


  useEffect(() => {
    if(isModalOpen == false){
      fetchPortfolioList();
    }
  }, [isModalOpen, statusSelected, debouncedSearchTerm, categorySelected]);
  return (
    <div className="w-full h-[80%] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300">
      <table className="relative w-full text-sm text-left rtl:text-right text-light-gray-950 dark:text-dark-white">
        <thead className="sticky top-0 text-xs text-light-gray-950 uppercase bg-light-gray-300 dark:bg-dark-blue-600 dark:text-dark-gray ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Preview
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Category
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
          {
            portfolios.length > 0 ? 
            portfolios.map((portfolio, index) => (
              <tr kay={portfolio._id} className="odd:bg-light-white odd:dark:bg-dark-blue-900 even:bg-light-gray-100 even:dark:bg-dark-blue-400 border-b dark:border-dark-blue-300 border-light-gray-100">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                >
                  <p 
                  className="cursor-pointer text-light-gray-950 dark:text-dark-white"
                  onClick={() => NavigatePreviwe(portfolio)}
                  >
                    <VscPreview  size={18}/>
                  </p>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                >
                  {portfolio.title}
                </td>
                <td className="px-6 py-4">{portfolio?.category?.name}</td>
                <td className="px-6 py-4">
                  {portfolio.status ? (
                        <div className="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                          Inactive
                        </div>
                      )}
                </td>
                <td className="flex w-full justify-evenly py-4">
                  <div>
                    <p
                      className="cursor-pointer font-medium text-blue-600 dark:text-blue-500"
                      onClick={() => {
                        setIsModalOpenU(!isModalOpenU);
                        setPortfolioData({
                          '_id': portfolio._id,
                          'title': portfolio.title,
                          'description': portfolio.description,
                          'type': portfolio.type,
                          'category': portfolio.category,
                          'secureUrl': portfolio.secureUrl
                        });
                      }}
                    >
                      Edit
                    </p>
                  </div>
                  <div>
                    {
                      isRootAdmin && 
                      <p
                        className={`cursor-pointer font-medium ${
                          portfolio.status ? "text-red-500" : "text-green-500"
                        }`}
                        onClick={() => portfolioToggle(portfolio._id)}
                      >
                        {
                          togglingPortfolioId == portfolio._id ? (
                            <ClipLoader
                              color={theme == 'dark' ? "#ebf1f8" : '#030712'}
                              loading={isportfolioToogleLoading}
                              size={13}
                            />
                          ) : portfolio.status ? ( 
                            "Block"
                          ) : (
                            "Unblock"
                          )
                        }
                      </p>
                    }
                  </div>
                  <div>
                    {
                      isRootAdmin && 
                      <button className="cursor-pointer text-red-500"
                      onClick={() => portfolioDelete(portfolio._id, portfolio.title)}
                      >
                        <MdDelete size={18} />
                      </button>
                    }
                  </div>
                </td>
              </tr>
            ))
            :
            <div className="absolute w-fit top-[70px] left-[47%] bg-light-gray-400 dark:bg-dark-blue-300 p-3.5 rounded-full">
              <img className="w-[70px]" src={noDataPng} alt="" />
            </div>
          } 
        </tbody>
      </table>
      <PortfolioForm 
        setIsModalOpen={setIsModalOpenU} 
        isModalOpen={isModalOpenU} 
        role="update"
        data={portfolioData} 
        setPortfolioUpdateData={setPortfolioData}  
      />

      <PortPreview
       isPreview={isPreview}
       setIsPreview={setIsPreview}
      />
    </div>
  );
};

export default PortfolioList;
