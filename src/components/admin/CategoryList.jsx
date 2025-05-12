import React, { useEffect, useState } from "react";
import { listCategory } from "../../features/category/categoryListing";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import CategoryForm from "./CategoryForm";
import { categoryStatusToggle } from "../../features/category/categoryBlock";
import useDebounce from "../../hook/useDebounce";
import noDataPng from '../../assets/images/no_data.png'

const CategoryList = ({ isModalOpen, selected, searchTerm }) => {
  const [categories, setCategories] = useState([]);
  const [updateCategoryData, setUpdateCategoryData] = useState({});
  const [isModalOpenU, setIsModalOpenU] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.categoryList);
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

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
    try {
      await dispatch(categoryStatusToggle({'categoryId': category_id})).unwrap()
      fetchCategoryList()
    } catch (error) {
      console.log(error, 'from front side')
    }
  }

  return (
    <div className="w-full h-[80%] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300">
      <table className="relative w-full text-sm text-left rtl:text-right text-light-gray-950 dark:text-dark-white">
        <thead className="sticky top-0 text-xs text-light-gray-950 uppercase bg-light-gray-300 dark:bg-dark-blue-600 dark:text-dark-gray ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Total
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
          {isLoading && (
            <span className="absolute right-1/2 top-[60px]">
              <PuffLoader
                color=""
                className="dark:text-dark-white text-light-gray-800"
                loading={isLoading}
                height={10}
                width={4}
              />
            </span>
          )}
          {error && (
            <p className="text-error text-sm absolute right-1/2 top-[60px]">
              {error}
            </p>
          )}
          {
            categories.length > 0 ?
            categories.map((category, index) => (
              <tr
                key={category._id}
                className="odd:bg-light-white odd:dark:bg-dark-blue-900 even:bg-light-gray-100 even:dark:bg-dark-blue-400 border-b dark:border-dark-blue-300 border-light-gray-100"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                >
                  {category.name}
                </th>
                <td className="px-6 py-4">
                  {category.totolPortfolio}
                </td>
                <td className="px-6 py-4">
                  {category.status ? (
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
                    onClick={() => {
                      setIsModalOpenU(!isModalOpenU);
                      setUpdateCategoryData({
                        '_id': category._id,
                        'name': category.name,
                      });
                    }}
                  >
                    Edit
                  </p>
  
                  <p
                    href="#"
                    className={`cursor-pointer font-medium ${
                      category.status ? "text-red-500" : "text-green-500"
                    }`}
                    onClick={() => categoryToggle(category._id)}
                  >
                    {category.status ? "Block" : "Unblock"}
                  </p>
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
      <CategoryForm
        setIsModalOpen={setIsModalOpenU}
        isModalOpen={isModalOpenU}
        role="update"
        data={updateCategoryData}
        setUpdateCategoryData={setUpdateCategoryData}
      />
    </div>
  );
};

export default CategoryList;
