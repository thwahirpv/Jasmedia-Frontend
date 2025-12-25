import React, { useEffect, useState } from 'react'
import ThemeToggle from '../../components/common/ThemeToggle'
import CountShow from '../../components/admin/CountShow'
import { useDispatch, useSelector } from 'react-redux'
import { totalCountThunk } from '../../features/dashboard/totalCount'
import PuffLoader from 'react-spinners/PuffLoader'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [totals, setTotals] = useState({})
  const { isTotalLoading, totalError } = useSelector((state) => state.dashboardTotal)

  const fetchTotal = async () => {
    try {
      const response = await dispatch(totalCountThunk()).unwrap()
      setTotals(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTotal()
  }, [])

  return (
    <div className='w-full min-h-screen bg-agency-black p-6 md:p-10'>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-3xl font-bold font-russo text-white">Dashboard</h1>
           <p className="text-gray-400 mt-1 font-opensans">Overview of your agency's performance.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          isTotalLoading ? (
            <div className="col-span-full flex justify-center py-20">
                <PuffLoader color="#16a34a" size={60} />
            </div>
          ) : totalError ? (
              <div className="col-span-full bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                 <p>Error loading dashboard data</p>
              </div>
          ) : totals ? (
            <>
            <CountShow
              title="Categories"
              count={totals.totalCategory ?? 0}
              isLoading={isTotalLoading}
              totalError={totalError}
            />
            <CountShow
              title="Portfolio Items"
              count={totals.totalportfolio ?? 0}
              isLoading={isTotalLoading}
              totalError={totalError}
            />
            <CountShow
              title="Feedback / Messages"
              count={totals.totalFeedback ?? 0}
              isLoading={isTotalLoading}
              totalError={totalError}
            />
          </>
          ) : (
            <p className="text-gray-500">No data found</p>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard
