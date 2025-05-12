import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../features/category/category";
import { updateCategoty } from "../../features/category/categoryUpdate";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useTheme from "../../hook/useTheme";

const categorySwal = withReactContent(Swal)

const CategoryForm = ({ setIsModalOpen, isModalOpen, role, data={}, setUpdateCategoryData}) => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.category);
  const { isUpdateLoading, updateError } = useSelector((state) => state.categoryUpdate)
  const {theme} = useTheme()

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role == "create") {
      try {
        await dispatch(createCategory({ name: categoryName })).unwrap()
        setIsModalOpen(false)
        setCategoryName('')
        categorySwal.fire({
          title: 'Created',
          icon: 'success',
          text: `${categoryName}`,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        })
      } catch (error) {
        setIsModalOpen(false)
        setCategoryName('')
        categorySwal.fire({
          title: 'Create failed!',
          icon: 'error',
          text: `${categoryName}`,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: 'Try one more',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        })
      }
    } else {
      try {
        await dispatch(updateCategoty({'categoryId': data._id, 'name': categoryName || data && data.name})).unwrap()
        setIsModalOpen(false)
        setUpdateCategoryData({})
        setCategoryName('')
        categorySwal.fire({
          title: 'Updated',
          icon: 'success',
          text: `${categoryName}`,
          allowOutsideClick: true,
          allowEscapeKey: true,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        })
      } catch (error) {
        setIsModalOpen(false)
        setUpdateCategoryData({})
        setCategoryName('')
        categorySwal.fire({
          title: 'Update failded!',
          icon: 'error',
          text: updateError,
          allowOutsideClick: true,
          allowEscapeKey: true,
          showConfirmButton: true,
          confirmButtonText: 'Try one more',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        })
      }
    }
  };

  useEffect(() => {
    if(data && data.name){
      console.log(data.name)
      setCategoryName(data.name)
    }
  }, [data])
  
  return (
    <div
      className={`absolute left-0 right-0 opacity-0 h-screen bg-light-gray-50 dark:bg-dark-blue-100 flex justify-center transition-all overflow-hidden
    ${
      isModalOpen
        ? "bottom-0 items-center opacity-100 visible"
        : "invisible bottom-full"
    }`}
    >
      <div className="relative h-fit bg-light-gray-300 dark:bg-dark-blue-900 rounded-md py-6 px-7 flex flex-col items-center space-y-6">
        <span className="absolute cursor-pointer top-2 right-2 text-light-gray-950 dark:text-dark-white">
          <IoCloseSharp
            size={20}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </span>
        <h1 className="font-medium text-light-gray-950 dark:text-dark-white">
          {
            role == 'create' ? "Add Category" : "Edit Category"
          }
        </h1>
        <div>
          <form
            action=""
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-0.5">
              {
                error ? <p className="text-[11px] text-error">{error}</p> 
                :
                <label className="text-[11px] text-light-gray-950 dark:text-dark-white" htmlFor="category_name">Category name</label>
              }
              <input
                id="category_name"
                className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
                placeholder="Category"
                type="text"
                value={categoryName}
                onChange={handleCategoryNameChange}
              />
              </div>
            <button
              className="cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray"
              type="submit"
            >
              {isLoading || isUpdateLoading ? (
                <ScaleLoader
                  color="#030712"
                  loading={isLoading}
                  height={10}
                  width={4}
                />
              ) : (
                role == 'create' ? "Add" : "Edit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
