import React, { useEffect, useState } from 'react'
import ThemeToggle from '../../components/common/ThemeToggle'
import CountShow from '../../components/admin/CountShow'
import { useDispatch, useSelector } from 'react-redux'
import { totalCountThunk } from '../../features/dashboard/totalCount'

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
        <CountShow title='Category' count={totals.totalCategory} isLoading={isTotalLoading} totalError={totalError} />
        <CountShow title='Portfolio' count={totals.totalportfolio} isLoading={isTotalLoading} totalError={totalError} />
        <CountShow title='Feedback' count={totals.totalFeedback} isLoading={isTotalLoading} totalError={totalError} />
      </div>
    </div>
  )
}

export default Dashboard
