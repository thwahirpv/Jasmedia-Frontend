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
        // background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        // color: theme == 'dark' ? "#ebf1f8" : '#030712',
      });
    } finally {
      setTogglingPortfolioId(null)
    }
  }

  const portfolioDelete = async (portfolio_id, title) => {
      portfolioSwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        text: `Delete ${title}?`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#0a0a0a',
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
    <div className="w-full overflow-auto rounded-lg">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-white uppercase bg-white/10">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tl-lg">Preview</th>
            <th scope="col" className="px-6 py-4">Title</th>
            <th scope="col" className="px-6 py-4">Category</th>
            <th scope="col" className="px-6 py-4">Status</th>
            <th scope="col" className="px-6 py-4 rounded-tr-lg text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {
            portfolios.length > 0 ? 
            portfolios.map((portfolio, index) => (
              <tr key={portfolio._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white cursor-pointer"
                  onClick={() => NavigatePreviwe(portfolio)}
                  title="Preview"
                  >
                    <VscPreview  size={18}/>
                  </button>
                </td>
                <td className="px-6 py-4 font-semibold text-white">
                  {portfolio.title}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300">
                    {portfolio?.category?.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {portfolio.status ? (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500/75 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <span className="text-green-500 font-medium">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-red-500"></span>
                          <span className="text-red-500 font-medium">Inactive</span>
                        </div>
                      )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="font-medium text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
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
                    </button>
                    
                    {isRootAdmin && (
                      <>
                        <button
                          className={`font-medium ${
                            portfolio.status ? "text-red-500 hover:text-red-400" : "text-green-500 hover:text-green-400"
                          } transition-colors min-w-[60px] text-center cursor-pointer`}
                          onClick={() => portfolioToggle(portfolio._id)}
                        >
                          {
                            togglingPortfolioId == portfolio._id ? (
                              <ClipLoader color={portfolio.status ? "#ef4444" : "#22c55e"} loading={isportfolioToogleLoading} size={15} />
                            ) : portfolio.status ? "Block" : "Unblock"
                          }
                        </button>

                        <button 
                          className="text-red-500/80 hover:text-red-500 transition-colors cursor-pointer"
                          onClick={() => portfolioDelete(portfolio._id, portfolio.title)}
                          title="Delete"
                        >
                          <MdDelete size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
            :
            <tr>
              <td colspan="5" className="px-6 py-10 text-center">
                 <div className="flex flex-col items-center justify-center">
                    <img className="w-24 opacity-50 mb-4" src={noDataPng} alt="No Data" />
                    <p className="text-gray-400 font-medium">No portfolio items found</p>
                 </div>
              </td>
            </tr>
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
