import React, { useEffect, useState } from "react";
import { listCategory } from "../../features/category/categoryListing";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import ClipLoader from "react-spinners/ClipLoader"
import CategoryForm from "./CategoryForm";
import { categoryStatusToggle } from "../../features/category/categoryBlock";
import useDebounce from "../../hook/useDebounce";
import noDataPng from '../../assets/images/no_data.png'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useTheme from '../../hook/useTheme'
import CategoryPreview from "./CategoryPreview";
import { VscPreview } from "react-icons/vsc";
import { setCategoryPreview } from "../../features/category/categoryPreview";

const categorySwal = withReactContent(Swal)

const CategoryList = ({ isModalOpen, selected, searchTerm }) => {
  const [categories, setCategories] = useState([]);
  const [updateCategoryData, setUpdateCategoryData] = useState({});
  const [isModalOpenU, setIsModalOpenU] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.categoryList);
  const { isToggleLoading, categoryError } = useSelector((state) => state.categoryStatus);
  const { isRootAdmin } = useSelector((state) => state.auth)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [theme, setTheme] = useTheme()
  const [isPreview, setIsPreview] = useState(false) 
  const [togglingCategoryId, setTogglingCategoryId] = useState(null)


  const fetchCategoryList = async () => {
    try {
      const response = await dispatch(listCategory()).unwrap();
      if(selected == 'Active'){
        setCategories(response.category.filter(item => item.status == true && item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
      }
      else if(selected == 'Deactive'){
        setCategories(response.category.filter(item => item.status == false && item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())))
      }
      else{
        setCategories(response.category.filter(item => item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())));
      }
    } catch (err) {
      console.log(err, "from catch");
    }
  };

  useEffect(() => {
    if (isModalOpen == false || isModalOpenU == false || selected || debouncedSearchTerm) {
      fetchCategoryList();
    }
  }, [isModalOpenU, isModalOpen, selected, debouncedSearchTerm]);

  const categoryToggle = async (category_id) => {
    setTogglingCategoryId(category_id)
    try {
      await dispatch(categoryStatusToggle({'categoryId': category_id})).unwrap()
      fetchCategoryList()
    } catch (error) {
      categorySwal.fire({
        title: 'Toggle failed',
        text: `${categoryError}`,
        icon: 'error',
        confirmButtonText: 'OK',
        background: theme == 'dark' ? '#2f3946' : '#ecececf5',
        color: theme == 'dark' ? "#ebf1f8" : '#030712',
      });
    } finally {
      setTogglingCategoryId(null)
    }
  } 

  const NavigatePreviwe = (category) => {
    dispatch(setCategoryPreview(category))
    setIsPreview(!isPreview)
  }

  return (
    <div className="w-full h-[80%] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-800 scrollbar-track-gray-900">
      <table className="relative w-full text-sm text-left text-gray-300">
        <thead className="sticky top-0 text-xs text-white uppercase bg-white/10">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tl-lg">
              Preview
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Total
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4 rounded-tr-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {isLoading && (
            <span className="absolute right-1/2 top-[60px]">
              <PuffLoader
                color="#22c55e"
                className="text-green"
                loading={isLoading}
                height={10}
                width={4}
              />
            </span>
          )}
          {error && (
            <p className="text-red-500 text-sm absolute right-1/2 top-[60px]">
              {error}
            </p>
          )}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr
                key={category._id}
                className="hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  <p
                    className="cursor-pointer p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors w-fit text-white"
                    onClick={() => NavigatePreviwe(category)}
                  >
                    <VscPreview size={18} />
                  </p>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-semibold text-white whitespace-nowrap"
                >
                  {category.name}
                </td>
                <td className="px-6 py-4">{category.totolPortfolio}</td>
                <td className="px-6 py-4">
                  {category.status ? (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-green-500 font-medium">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      <span className="text-red-500 font-medium">Inactive</span>
                    </div>
                  )}
                </td>
                <td className="flex px-6 py-4 space-x-3">
                  <p
                    className="cursor-pointer font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() => {
                      setIsModalOpenU(!isModalOpenU);
                      setUpdateCategoryData({
                        _id: category._id,
                        name: category.name,
                      });
                    }}
                  >
                    Edit
                  </p>

                  {isRootAdmin && (
                    <p
                      className={`cursor-pointer font-medium transition-colors ${
                        category.status ? "text-red-500 hover:text-red-400" : "text-green-500 hover:text-green-400"
                      }`}
                      onClick={() => categoryToggle(category._id)}
                    >
                      {togglingCategoryId === category._id ? (
                        <ClipLoader
                          color={category.status ? "#ef4444" : "#22c55e"}
                          loading={true}
                          size={13}
                        />
                      ) : category.status ? (
                        "Block"
                      ) : (
                        "Unblock"
                      )}
                    </p>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <div className="absolute w-full flex justify-center mt-10 opacity-50">
               <img className="w-[100px] grayscale invert" src={noDataPng} alt="No data" />
            </div>
          )}
        </tbody>
      </table>
      <CategoryForm
        setIsModalOpen={setIsModalOpenU}
        isModalOpen={isModalOpenU}
        role="update"
        data={updateCategoryData}
        setUpdateCategoryData={setUpdateCategoryData}
      />

      <CategoryPreview isPreview={isPreview} setIsPreview={setIsPreview} />
    </div>
  );
};

export default CategoryList;
