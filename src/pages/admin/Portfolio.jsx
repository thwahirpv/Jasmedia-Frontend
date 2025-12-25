import React, { useEffect, useState } from "react";
import ThemeToggle from "../../components/common/ThemeToggle";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import PortfolioList from "../../components/admin/PortfolioList";
import PortfolioForm from "../../components/admin/PortfolioForm";
import useTheme from "../../hook/useTheme";
import { listCategory } from "../../features/category/categoryListing";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";


const portfolioSwal = withReactContent(Swal)


const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [statusSelected, setStatusSelected] = useState("All");
  const [categorySelected, setCategorySelected] = useState('')
  const [categorySelectedName, setCategorySelectedName] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerms, setSearchTerms] = useState('')
  const [categories, setCategories] = useState([])
  const [theme, setTheme] = useTheme()
  const dispatch = useDispatch()

  const options = ["All", "Active", "Deactive"];

  const fetchCategory = async () =>{
      try {
            const response = await dispatch(listCategory()).unwrap()
            setCategories(response.category)
          }
          catch (error) {
            console.log(error)
          }
    }

  
    useEffect(() => {
      fetchCategory()
    }, [])

  return (
    <div className='w-full h-screen overflow-hidden bg-agency-black p-6 md:p-10'>
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <h1 className="text-3xl font-bold font-russo text-white">Portfolio</h1>
           <p className="text-gray-400 mt-1 font-opensans">Manage your projects and case studies.</p>
        </div>
        
        <button 
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="px-6 py-2.5 bg-white/10 text-white border border-white/10 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg flex items-center gap-2">
            <span>+ Add Project</span>
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          
          <div className="flex gap-4 w-full md:w-auto">
             {/* status toggle */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-between w-32 px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 focus:outline-none"
                type="button"
              >
                {statusSelected}
                <FaAngleDown className="ml-2 text-gray-400" />
              </button>
              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute z-10 mt-2 w-32 bg-[#1a1a1a] rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden border border-white/10">
                  <ul className="py-1 text-sm text-gray-300">
                    {options.map((option, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setStatusSelected(option);
                            setIsOpen(false);
                          }}
                          className={`flex w-full px-4 py-2 hover:bg-white/10 ${statusSelected === option ? 'bg-green/10 text-green font-bold' : ''}`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* category toggle */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="inline-flex items-center justify-between w-40 px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 focus:outline-none"
                type="button"
              >
                <span className="truncate">{categorySelectedName}</span>
                <FaAngleDown className="ml-2 text-gray-400" />
              </button>
              {/* Dropdown menu */}
              {isCategoryOpen && (
                <div className="absolute z-10 mt-2 w-40 max-h-60 overflow-y-auto bg-[#1a1a1a] rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden scrollbar-thin scrollbar-thumb-gray-700 border border-white/10">
                  <ul className="py-1 text-sm text-gray-300">
                    <li>
                        <button
                          onClick={() => {
                            setCategorySelected('');
                            setCategorySelectedName('All')
                            setIsCategoryOpen(false);
                          }}
                          className={`flex w-full px-4 py-2 hover:bg-white/10 ${categorySelected === '' ? 'bg-green/10 text-green font-bold' : ''}`}
                        >
                          All
                        </button>
                      </li>
                    {
                    categories.map((category, index) => (
                      <li key={category._id}>
                        <button
                          onClick={() => {
                            setCategorySelected(category._id);
                            setCategorySelectedName(category.name)
                            setIsCategoryOpen(false);
                          }}
                          className={`flex w-full px-4 py-2 hover:bg-white/10 text-left ${categorySelected === category._id ? 'bg-green/10 text-green font-bold' : ''}`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoMdSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2.5 pl-10 text-sm text-white border border-white/10 rounded-xl bg-white/5 focus:ring-green focus:border-green outline-none transition-all placeholder-gray-500"
              placeholder="Search projects..."
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </div>
        </div>
        
        <PortfolioList setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} statusSelected={statusSelected} searchTerms={searchTerms} categorySelected={categorySelected} />
      </div>
      
      <PortfolioForm setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} role='create' />
      
    </div>
  );
};

export default Portfolio;
