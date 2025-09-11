import React, { useState, useEffect } from 'react'
import useTheme from '../../hook/useTheme'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import PuffLoader from 'react-spinners/PuffLoader'
import { listAdminThunk } from '../../features/admin/listAdminsSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteAdminThunk } from '../../features/admin/deleteAdminSlice'
import { toggleAdminThunk } from '../../features/admin/toggleAdminSliec'
import useDebounce from "../../hook/useDebounce";
import noDataPng from '../../assets/images/no_data.png'

const adminSwal = withReactContent(Swal)

const AdminsList = ({isModalOpen, statusSelected, searchTerm}) => {
    const dispatch = useDispatch()
    const [admins, setAdmins] = useState([])
    const { isListAdminLoading, listAdminError } = useSelector((state) => state.listAdmin)
    const { adminToggleError } = useSelector((state) => state.adminToggle)
    const { deleteAdminError } = useSelector((state) => state.deleteAdmin)
    const [updateData, setUpdateData] = useState({})
    const [theme, setTheme] = useTheme()
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { isRootAdmin, email } = useSelector((state) => state.auth)

    const fetchAdmins = async () => {
      try {
        const response = await dispatch(listAdminThunk()).unwrap()
        console.log('Iam here to fetch admins...')
        console.log(response)
        if (statusSelected === 'Active') {
          setAdmins(response.filter(item => 
            item.isBlocked === false &&
            (
              item.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
              item.emailAddress?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
          ))
          return
        } else if (statusSelected === 'Deactive') {
          setAdmins(response.filter(item => 
            item.isBlocked === true &&
            (
              item.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
              item.emailAddress?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
          ))
          return
        } else {
          setAdmins(response.filter(item => 
            item.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
            item.emailAddress?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ))
        }
      } catch (error) {
        console.log(error)
      }
    }

    const onDeleteAdmin = (adminID, adminEmail) => {
      console.log(adminID)
        adminSwal.fire({
          title: 'Are you sure ?',
          icon: 'warning',
          text: `To delete ${adminEmail}`,
          allowOutsideClick: true,
          allowEscapeKey: true,
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonText: 'Not',
          confirmButtonText: 'Sure',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        }).then( async (res) => {
          if(res.isConfirmed) {
            try {
              adminSwal.fire({
                title: `Deleting ${adminEmail}...`,
                didOpen: () => {
                  adminSwal.showLoading();
                },
                allowOutsideClick: false,
                background: theme == 'dark' ? '#2f3946' : '#ecececf5',
                color: theme == 'dark' ? "#ebf1f8" : '#030712',
              })
              const response = await dispatch(deleteAdminThunk({'adminId': adminID})).unwrap()
              adminSwal.fire({
                title: `${adminEmail} Deleted`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
                background: theme == 'dark' ? '#2f3946' : '#ecececf5',
                color: theme == 'dark' ? "#ebf1f8" : '#030712',
              })
              fetchAdmins()
            } catch (error) {
              console.log(error, 'error from front')
              adminSwal.fire({
                title: 'Delete failed',
                text: `${deleteAdminError}`,
                icon: 'error',
                confirmButtonText: 'OK',
                background: theme == 'dark' ? '#2f3946' : '#ecececf5',
                color: theme == 'dark' ? "#ebf1f8" : '#030712',
              });
            }
          }
        })
    }

    const onToggleAdmin = async (adminID) => {
      try {
        const response = await dispatch(toggleAdminThunk({'adminId': adminID})).unwrap()
        fetchAdmins()
      } catch (error) {
        console.log(adminToggleError)
        adminSwal.fire({
          title: 'Toggle failed!',
          icon: 'error',
          text: `${adminToggleError}`,
          confirmButtonText: 'OK',
          background: theme == 'dark' ? '#2f3946' : '#ecececf5',
          color: theme == 'dark' ? "#ebf1f8" : '#030712',
        });
      }
    }

    useEffect(() => {
      if(isModalOpen == false) {
        fetchAdmins()
      }
    }, [isModalOpen, statusSelected, debouncedSearchTerm])
    
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
            {
              isRootAdmin && 
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            }
          </tr>
        </thead>
        <tbody className="relative">
          {isListAdminLoading && (
            <span className="absolute left-[45%] top-[60px]">
              <PuffLoader
                color=""
                className="dark:text-dark-white text-light-gray-800"
                loading={isListAdminLoading}
                height={10}
                width={4}
              />
            </span>
          )}
          {listAdminError && (
            <p className="text-error text-sm absolute left-[45%] top-[60px]">
              {typeof listAdminError === "string" ? listAdminError : JSON.stringify(listAdminError)}
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
                <td className="px-6 py-4">
                  {admin.emailAddress} 
                  {
                    admin.emailAddress == email && (
                      <span className='bg-green-500 px-2 py-0.5 rounded-md text-[11px] font-semibold text-user-smokewhite ml-1.5'>
                        You
                      </span>
                    )
                  }
                </td>
                <td className="px-6 py-4">
                  {admin.isBlocked ? (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  )}
                </td>
                {
                  isRootAdmin && admin.emailAddress !== email &&
                  (
                    <td className="flex px-6 py-4 space-x-4"> 
                        <p
                          href="#"
                          className={`cursor-pointer font-medium ${
                            admin.isBlocked ? "text-green-500" : "text-red-500"
                          }`}
                          onClick={() => onToggleAdmin(admin._id)}
                        >
                          {admin.isBlocked ? "Unblock" : "Block"}
                        </p>
                        <button className="cursor-pointer text-red-500"
                          onClick={() => onDeleteAdmin(admin._id, admin.emailAddress)}
                        >
                          <MdDelete size={18} />
                        </button>
                    </td>
                  )
                }
              </tr>
            )) 
            :
            <div className="absolute w-fit top-[70px] left-[47%] bg-light-gray-400 dark:bg-dark-blue-300 p-3.5 rounded-full">
              <img className="w-[40px] md:w-[50px]" src={noDataPng} alt="" />
            </div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminsList
