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
    <div className='w-full h-[100vh] bg-light-gray-300 dark:bg-dark-blue-900'>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className='w-full h-[100%] flex flex-col md:flex-row justify-evenly items-center'>
        {
          isTotalLoading ? (
            <PuffLoader
                color=""
                className="dark:text-dark-white text-light-gray-800"
                loading={isTotalLoading}
                height={10}
                width={4}
            />
          ) : totalError ? (
              <p className="text-red-500">Error loading dashboard data</p>
          ) : totals ? (
            <>
            <CountShow
              title="Category"
              count={totals.totalCategory ?? 0}
              isLoading={isTotalLoading}
              totalError={totalError}
            />
            <CountShow
              title="Portfolio"
              count={totals.totalportfolio ?? 0}
              isLoading={isTotalLoading}
              totalError={totalError}
            />
            <CountShow
              title="Feedback"
              count={totals.totalFeedback ?? 0}
              isLoading={isTotalLoading}
              totalError={totalError}
            />
          </>
          ) : (
            <p className="text-white">No data found</p>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard
