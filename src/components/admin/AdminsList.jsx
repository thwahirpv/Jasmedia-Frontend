import React from 'react'
import useTheme from '../../hook/useTheme'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import PuffLoader from 'react-spinners/PuffLoader'
import { useState } from 'react'
import AdminsForm from './AdminsForm'
import { listAdminThunk } from '../../features/admin/listAdminsSlice'

const AdminsList = ({isModalOpen, statusSelected, searchTerm}) => {
    const dispatch = useDispatch()
    const [admins, setAdmins] = useState([{'_id': 1233144, 'name': 'Thwhair', 'email': 'thwahir@gmail.com', 'status': true}])
    const { isListLoading, isListError } = useSelector((state) => state.feedbackList)
    const [updateData, setUpdateData] = useState({})
    const [theme, setTheme] = useTheme()

    const fetchAdmins = async () => {
      try {
        const response = await dispatch(listAdminThunk()).unwrap()
        setAdmins(response)
      } catch (error) {
        console.log(error)
      }
    }

    useState(() => {
      if(isModalOpen == false) {
        fetchAdmins()
      }
    }, [isModalOpen])
  return (
    <div className="w-full h-[80%] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300">
      <table className="relative w-full text-sm text-left rtl:text-right text-light-gray-950 dark:text-dark-white">
        <thead className="sticky top-0 text-xs text-light-gray-950 uppercase bg-light-gray-300 dark:bg-dark-blue-600 dark:text-dark-gray ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              email
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
          {isListLoading && (
            <span className="absolute left-[45%] top-[60px]">
              <PuffLoader
                color=""
                className="dark:text-dark-white text-light-gray-800"
                loading={isListLoading}
                height={10}
                width={4}
              />
            </span>
          )}
          {isListError && (
            <p className="text-error text-sm absolute left-[45%] top-[60px]">
              {isListError}
            </p>
          )}
          {
            admins.length > 0 ?
            admins.map((admin, index) => (
              <tr
                key={admin._id}
                className="odd:bg-light-white odd:dark:bg-dark-blue-900 even:bg-light-gray-100 even:dark:bg-dark-blue-400 border-b dark:border-dark-blue-300 border-light-gray-100"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                >
                  {admin.name}
                </th>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">
                  {admin.status ? (
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
                    href="#"
                    className={`cursor-pointer font-medium ${
                      admin.status ? "text-red-500" : "text-green-500"
                    }`}
                    // onClick={() => onFeedbackToggle(admin._id)}
                  >
                    {admin.status ? "Block" : "Unblock"}
                  </p>
                  <button className="cursor-pointer text-red-500"
                    // onClick={() => onDeleteFeedback(admin._id, admin.name)}
                  >
                    <MdDelete size={18} />
                  </button>
                </td>
              </tr>
            )) 
            :
            <div className="absolute w-fit top-[70px] left-[47%] bg-light-gray-400 dark:bg-dark-blue-300 p-3.5 rounded-full">
              {/* <img className="w-[70px]" src={noDataPng} alt="" /> */}
            </div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminsList
