import React from 'react'

const CategoryList = ({setIsModalOpen,  isModalOpen}) => {
    const demo_data = [
        {
          id: 2,
          name: "Videography",
          total: 32,
          status: true,
        },
        {
          id: 3,
          name: "Photograpphy",
          total: 20,
          status: true,
        },
        {
          id: 4,
          name: "Audiography",
          total: 5,
          status: false,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
        {
          id: 5,
          name: "Website",
          total: 10,
          status: true,
        },
      ];
  return (
    <div className="w-full h-[80%] overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300">
          <table className="relative w-full text-sm text-left rtl:text-right text-light-gray-950 dark:text-dark-white">
            <thead className="sticky top-0 text-xs text-light-gray-950 uppercase bg-light-gray-300 dark:bg-dark-blue-600 dark:text-dark-gray ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {demo_data.map((data, index) => (
                <tr className="odd:bg-light-white odd:dark:bg-dark-blue-900 even:bg-light-gray-100 even:dark:bg-dark-blue-400 border-b dark:border-dark-blue-300 border-light-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-light-gray-950 whitespace-nowrap dark:text-dark-white"
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-4">{data.total}</td>
                  <td className="px-6 py-4">
                    {data.status ? (
                      <div className="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        Active
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                        Inactive
                      </div>
                    )}
                  </td>
                  <td className="flex px-6 py-4 space-x-4">
                    <p className="cursor-pointer font-medium text-blue-600 dark:text-blue-500">
                      Edit
                    </p>

                    {data.status ? (
                      <p
                        href="#"
                        className="cursor-pointer font-medium text-red-500 dark:text-red-500"
                      >
                        Deactivate
                      </p>
                    ) : (
                      <p
                        href="#"
                        className="cursor-pointer font-medium text-green-500 dark:text-green-500"
                      >
                        Activate
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default CategoryList
