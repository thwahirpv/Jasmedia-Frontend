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
          background: '#1a1a1a',
          color: '#ffffff',
        }).then( async (res) => {
          if(res.isConfirmed) {
            try {
              adminSwal.fire({
                title: `Deleting ${adminEmail}...`,
                didOpen: () => {
                  adminSwal.showLoading();
                },
                allowOutsideClick: false,
                background: '#1a1a1a',
                color: '#ffffff',
              })
              const response = await dispatch(deleteAdminThunk({'adminId': adminID})).unwrap()
              adminSwal.fire({
                title: `${adminEmail} Deleted`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
                background: '#1a1a1a',
                color: '#ffffff',
              })
              fetchAdmins()
            } catch (error) {
              console.log(error, 'error from front')
              adminSwal.fire({
                title: 'Delete failed',
                text: `${deleteAdminError}`,
                icon: 'error',
                confirmButtonText: 'OK',
                background: '#1a1a1a',
                color: '#ffffff',
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
          background: '#1a1a1a',
          color: '#ffffff',
        });
      }
    }

    useEffect(() => {
      if(isModalOpen == false) {
        fetchAdmins()
      }
    }, [isModalOpen, statusSelected, debouncedSearchTerm])
    
  return (
    <div className="w-full h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent rounded-xl border border-white/10">
      <table className="relative w-full text-sm text-left text-gray-300">
        <thead className="sticky top-0 z-10 text-xs text-white uppercase bg-[#1a1a1a]">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tl-lg">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            {
              isRootAdmin && 
              <th scope="col" className="px-6 py-4 rounded-tr-lg">
                Action
              </th>
            }
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {isListAdminLoading && (
            <span className="absolute left-[45%] top-[60px]">
              <PuffLoader
                color="#22c55e"
                className="text-green"
                loading={isListAdminLoading}
                height={10}
                width={4}
              />
            </span>
          )}
          {listAdminError && (
            <p className="text-red-500 text-sm absolute left-[45%] top-[60px]">
              {typeof listAdminError === "string" ? listAdminError : JSON.stringify(listAdminError)}
            </p>
          )}
          {
            admins.length > 0 ?
            admins.map((admin, index) => (
              <tr
                key={admin._id}
                className="hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-semibold text-white whitespace-nowrap"
                >
                  {admin.name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-300">
                  {admin.emailAddress} 
                  {
                    admin.emailAddress == email && (
                      <span className='bg-green-500 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold text-white ml-2 tracking-wide'>
                        You
                      </span>
                    )
                  }
                </td>
                <td className="px-6 py-4">
                  {!admin.isBlocked ? (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500/75 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <span className="text-green-500 font-medium">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-red-500"></span>
                          <span className="text-red-500 font-medium">Inactive</span>
                        </div>
                      )}
                </td>
                {
                  isRootAdmin && admin.emailAddress !== email &&
                  (
                    <td className="flex px-6 py-4 space-x-3"> 
                        <p
                          className={`cursor-pointer font-medium transition-colors ${
                            admin.isBlocked ? "text-green-500 hover:text-green-400" : "text-red-500 hover:text-red-400"
                          }`}
                          onClick={() => onToggleAdmin(admin._id)}
                        >
                          {admin.isBlocked ? "Unblock" : "Block"}
                        </p>
                        <button className="cursor-pointer text-red-500/80 hover:text-red-500 transition-colors"
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
            <div className="absolute w-full flex justify-center mt-10 opacity-50">
               <img className="w-[80px] grayscale invert" src={noDataPng} alt="No data" />
            </div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminsList
