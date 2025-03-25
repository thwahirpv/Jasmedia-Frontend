import React, { useContext } from 'react'
import { SideBarContext } from './SideBar'

const SideBarItems = ({icon, text}) => {
    const { isOpen } = useContext(SideBarContext)
  return (
    <li className={`relative flex font-[500] px-5 py-2 text-sm rounded-md text-light-gray-950 hover:bg-light-gray-300 dark:text-dark-gray dark:hover:bg-dark-blue-900 cursor-pointer group ${isOpen && "space-x-4"}`}>
        {icon}
        <span className={`transition-all ${isOpen ? "block" : "hidden"}`}>{text}</span>
        {
            !isOpen && (
                <div className={`absolute left-full ml-6 z-10 px-2 py-1 bg-light-gray-950 text-light-gray-300 dark:bg-dark-blue-600 dark:text-dark-white
                    rounded-md -translate-x-3 opacity-20 invisible transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                   {text}
               </div>
            ) 
        }
    </li>
  )
}

export default SideBarItems
