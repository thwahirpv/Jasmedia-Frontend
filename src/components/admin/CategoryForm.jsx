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

import ReactDOM from "react-dom";

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
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#ffffff',
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
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#ffffff',
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
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#ffffff',
        })
      } catch (error) {
        setIsModalOpen(false)
        setUpdateCategoryData({})
        setCategoryName('')
        categorySwal.fire({
          title: 'Update failed!',
          icon: 'error',
          text: updateError,
          allowOutsideClick: true,
          allowEscapeKey: true,
          showConfirmButton: true,
          confirmButtonText: 'Try one more',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#ffffff',
        })
      }
    }
  };

  useEffect(() => {
    if(data && data.name){
      setCategoryName(data.name)
    }
  }, [data])
  
  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-agency-black/90 backdrop-blur-sm flex justify-center items-center transition-all duration-300
      ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      <div className="relative w-[90%] max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-2xl">
        <span className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-full">
          <IoCloseSharp
            size={24}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </span>
        <h1 className="text-2xl font-bold font-russo text-white tracking-wide">
          {
            role == 'create' ? "Add Category" : "Edit Category"
          }
        </h1>
        <div className="w-full">
          <form
            action=""
            className="flex flex-col space-y-5 w-full"
            onSubmit={handleSubmit}
          >
            <div className="space-y-1">
              {
                error ? <p className="text-red-500 text-xs pl-1">{error}</p> 
                :
                null
              }
              <input
                id="category_name"
                className="w-full bg-agency-black/50 text-white placeholder-gray-500 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                placeholder="Category Name"
                type="text"
                value={categoryName}
                onChange={handleCategoryNameChange}
              />
              </div>
            <button
              className="w-full bg-white hover:bg-gray-200 text-agency-black font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer"
              type="submit"
            >
              {isLoading || isUpdateLoading ? (
                <ScaleLoader
                  color="#000000"
                  loading={isLoading}
                  height={15}
                  width={4}
                />
              ) : (
                role == 'create' ? "Add Category" : "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CategoryForm;
