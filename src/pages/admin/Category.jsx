import React, { useState } from "react";
import ThemeToggle from "../../components/common/ThemeToggle";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import CategoryList from "../../components/admin/CategoryList";
import CategoryForm from "../../components/admin/CategoryForm";

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const options = ["All", "Active", "Deactive"];
  

  return (
    <div className="relative w-full h-[100vh] bg-light-gray-300 dark:bg-dark-blue-900 pb-[20px] pt-[100px] px-[15px] md:pt-[100px] md:px-[100px]">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="relative h-[100%] rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
          <div className="flex w-full md:w-0 md:space-x-6 justify-between md:justify-baseline">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-1 inline-flex items-center text-light-gray-950  bg-light-white border border-gray-300 focus:outline-none hover:bg-light-gray-300 focus:ring-4 focus:ring-light-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-dark-blue-600 dark:text-dark-white dark:border-dark-blue-400 dark:hover:bg-dark-blue-400 dark:focus:ring-dark-blue-600"
                type="button"
              >
                <span className="sr-only">Action button</span>
                {selected}
                <span className="w-2.5 h-2.5 ms-2.5">
                  <FaAngleDown />
                </span>
              </button>
              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute z-10 bg-light-white divide-y divide-light-gray-300 rounded-lg shadow-sm w-44 dark:bg-dark-blue-400 dark:divide-dark-blue-400 mt-2">
                  <ul className="py-1 text-sm text-light-gray-950 dark:text-dark-white">
                    {options.map((option, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setSelected(option);
                            setIsOpen(false);
                          }}
                          className={`cursor-pointer block px-4 py-2 w-full text-left hover:bg-light-gray-100 dark:hover:bg-dark-blue-600 dark:hover:text-white ${
                            selected === option
                              ? "bg-light-gray-300 dark:bg-dark-blue-300"
                              : ""
                          }`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mr-1">
                <button 
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="cursor-pointer px-5 py-1.5 text-light-gray-950  bg-light-white border border-gray-300 hover:bg-light-gray-300 font-medium rounded-lg text-sm  dark:bg-dark-blue-600 dark:text-dark-white dark:border-dark-blue-400 dark:hover:bg-dark-blue-400">
                    Add
                </button>
            </div>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <span className="w-4 h-4 text-gray-500 dark:text-gray-400">
                <IoMdSearch />
              </span>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-light-gray-950 border border-gray-300 rounded-lg w-80 bg-light-white focus:ring-light-gray-300 focus:light-gray-300 dark:bg-dark-blue-600 dark:border-dark-blue-400 dark:placeholder-gray-400 dark:text-dark-white dark:focus:ring-dark-blue-600 dark:focus:border-dark-blue-400 focus:outline-0"
              placeholder="Search category"
            />
          </div>
        </div>
        <CategoryList setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      </div>
      {/* {
        isModalOpen && 
      } */}
      <CategoryForm setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} role='create' />
    </div>
  );
};

export default Category;
