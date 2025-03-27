import React from 'react'
import ThemeToggle from '../../components/common/ThemeToggle'
import WorkCounter from '../../components/admin/WorkCounter'
import AdminsCount from '../../components/admin/AdminsCount'

const Dashboard = () => {
  return (
    <div className='w-full h-[100vh] bg-light-gray-300 dark:bg-dark-blue-900'>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className='w-full h-[50%] flex justify-evenly items-center'>
        <AdminsCount />
        <WorkCounter />
      </div>
    </div>
  )
}

export default Dashboard
