import React, { useEffect, useState } from 'react'
import ThemeToggle from '../../components/common/ThemeToggle'
import CountShow from '../../components/admin/CountShow'
import { useDispatch, useSelector } from 'react-redux'
import { totalCountThunk } from '../../features/dashboard/totalCount'
import { getLatestContactsThunk } from '../../features/contact/getLatestContacts'
import { latestPortfolioThunk } from '../../features/portfolio/latestPortfolio'
import PuffLoader from 'react-spinners/PuffLoader'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [totals, setTotals] = useState({})
  const { isTotalLoading, totalError } = useSelector((state) => state.dashboardTotal)
  const { contacts: recentContacts } = useSelector((state) => state.latestContact)
  const { portfolios: latestProjects } = useSelector((state) => state.latestPortfolio)

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
    dispatch(getLatestContactsThunk())
    dispatch(latestPortfolioThunk())
  }, [])

  return (
    <div className='w-full h-screen overflow-hidden bg-agency-black p-6 md:p-10 flex flex-col'>

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


      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 flex-grow min-h-0 pb-2">

        {/* Recent Inquiries Widget */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 overflow-hidden flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-russo text-white">Recent Inquiries</h2>
            <span className="text-xs text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-md">Latest 5</span>
          </div>

          <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Message</th>
                  <th className="pb-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentContacts?.map((contact) => (
                  <tr key={contact._id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="font-bold text-white text-sm">{contact.name}</div>
                      <a href={`mailto:${contact.email}`} className="text-xs text-gray-500 hover:text-green transition-colors">{contact.email}</a>
                    </td>
                    <td className="py-4 max-w-[200px]">
                      <p className="text-sm text-gray-400 truncate w-full">{contact.message}</p>
                      <a href={`tel:${contact.phoneNumber}`} className="text-xs text-gray-600 group-hover:text-gray-500">{contact.phoneNumber}</a>
                    </td>
                    <td className="py-4 text-right">
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-gray-600">
                        {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                  </tr>
                ))}
                {!recentContacts?.length && (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-gray-500 text-sm">No new inquiries yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Projects Widget */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 overflow-hidden flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-russo text-white">Latest Projects</h2>
            <span className="text-xs text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-md">Newest</span>
          </div>

          <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-grow">
            {latestProjects?.slice(0, 5).map((project) => (
              <div key={project._id} className="flex items-center gap-4 p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all group cursor-default">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                  {project.type === 'Video' ? (
                    <video src={project.secureUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" muted />
                  ) : (
                    <img src={project.secureUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">{project.title}</h3>
                  <p className="text-xs text-gray-500 truncate">{project.category?.name || 'Uncategorized'}</p>
                </div>
                <div className="flex-shrink-0">
                  {
                    project.status ? (
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500/75 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      </div>
                    )
                  }
                </div>
              </div>
            ))}
            {!latestProjects?.length && (
              <div className="py-10 text-center text-gray-500 text-sm">No projects added yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
