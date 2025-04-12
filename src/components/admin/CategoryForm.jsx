import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../features/category/category";
import { updateCategoty } from "../../features/category/categoryUpdate";
import ScaleLoader from "react-spinners/ScaleLoader";

const CategoryForm = ({ setIsModalOpen, isModalOpen, role, data={}}) => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.category);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role == "create") {
      await dispatch(createCategory({ name: categoryName }))
        .unwrap()
        .then((res) => {
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      try {
        await dispatch(updateCategoty({'categoryId': data._id, 'name': categoryName || data && data.name})).unwrap()
        setIsModalOpen(false)
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    if(data && data.name){
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
            <input
              className="bg-light-white dark:bg-dark-blue-600 text-light-gray-950 dark:text-dark-white border border-gray-300 dark:border-dark-blue-400 rounded-md outline-0 focus:border-2 pl-2 py-1"
              placeholder="Category"
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
            <button
              className="cursor-pointer text-sm text-light-gray-300 dark:text-dark-blue-900 font-medium py-1.5 rounded-md px-2 bg-light-gray-950 dark:bg-dark-gray"
              type="submit"
            >
              {isLoading ? (
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
