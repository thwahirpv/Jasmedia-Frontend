import React from 'react'
import CountUp from 'react-countup';

const AdminsCount = () => {
  return (
    <div className='w-fit bg-light-white dark:bg-dark-blue-400 p-7 rounded-md shadow space-y-2'>
        <h1 className='font-[500] text-md text-light-gray-950 dark:text-dark-white ' >Admin's</h1>
        <h1 className='text-center font-[500] text-light-gray-950 text-2xl dark:text-dark-gray'>
            <CountUp 
                start={0}
                end={3}
                duration={3} />
        </h1>
    </div>
  )
}

export default AdminsCount
