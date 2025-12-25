import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { collection } from "../../constants/constants";
import { historyThunk } from "../../features/history/historySlice";
import { clearFeedbackPreview } from "../../features/feedback/feedbackPreview";

const formatAction = (action) =>
  action ? action[0].toUpperCase() + action.slice(1) : "";

const formatDateTime = (createdAt) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(createdAt))
    .replace(",", "");
};

const FeedbackPreview = ({ isPreview, setIsPreview }) => {
  const [collectionHistory, setCollectionHistory] = useState([]);
  const { isHistoryLoading, historyError } = useSelector(
    (state) => state.listHistory
  );
  const { feedbackId, name, feedback, role, status, createdAt, updatedAt } =
    useSelector((state) => state.feedBackPreview);
  const dispatch = useDispatch();

  const closePreview = () => {
    setIsPreview(false);
    dispatch(clearFeedbackPreview());
    setCollectionHistory([]);
  };

  const fetchHistory = async () => {
    try {
      const data = {
        collectionId: feedbackId,
        collectionName: collection.FEEDBACK,
      };
      const response = await dispatch(historyThunk(data)).unwrap();
      setCollectionHistory(response);
    } catch (error) {
      console.log(historyError);
    }
  };

  useEffect(() => {
    if (isPreview) {
      fetchHistory();
    }
  }, [isPreview]);

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 bg-agency-black/90 backdrop-blur-sm flex justify-center items-center transition-all duration-300
      ${isPreview ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      <div className="relative w-[90%] max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-2xl space-y-8">
        <span className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-full">
          <IoClose
            size={24}
            onClick={closePreview}
          />
        </span>

        <h1 className="text-2xl font-bold font-russo text-white tracking-wide">
          {name}
        </h1>

        <div className="w-full">
             <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-2">Feedback</h3>
                <p className="text-gray-300 italic text-center text-lg leading-relaxed">
                  "{feedback}"
                </p>
             </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8">
            {/* Details Table */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Details</h3>
               <table className="w-full text-sm text-left text-gray-300">
                  <tbody className="divide-y divide-white/5">
                      <tr className="border-b border-white/5">
                          <td className="py-3 font-medium text-white">Name:</td>
                          <td className="py-3 text-right">{name}</td>
                      </tr>
                      <tr className="border-b border-white/5">
                          <td className="py-3 font-medium text-white">Role:</td>
                          <td className="py-3 text-right">{role}</td>
                      </tr>
                      <tr className="border-b border-white/5">
                          <td className="py-3 font-medium text-white">Status:</td>
                          <td className="py-3 flex justify-end">
                              {status ? (
                                <div className="flex items-center text-green-500">
                                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                  Active
                                </div>
                              ) : (
                                <div className="flex items-center text-red-500">
                                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                                  Inactive
                                </div>
                              )}
                          </td>
                      </tr>
                      <tr className="border-b border-white/5">
                          <td className="py-3 font-medium text-white">Created at:</td>
                          <td className="py-3 text-right">{createdAt}</td>
                      </tr>
                      <tr>
                          <td className="py-3 font-medium text-white">Updated at:</td>
                          <td className="py-3 text-right">{updatedAt}</td>
                      </tr>
                  </tbody>
               </table>
            </div>

            {/* History Section */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl flex flex-col h-[300px]">
                <div className="p-4 border-b border-white/10">
                   <h3 className="text-white font-bold text-center">History</h3>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  <ul className="flex flex-col p-4 space-y-3">
                    {isHistoryLoading && (
                        <div className="flex justify-center items-center h-full">
                           <PuffLoader color="#ffffff" size={30} />
                        </div>
                    )}
                    {historyError && (
                        <p className="text-red-500 text-center text-xs">{historyError}</p>
                    )}
                    {collectionHistory.length > 0 ? (
                      collectionHistory.map((history, index) => (
                        <li key={index} className="flex justify-between items-start border-b border-white/5 last:border-0 pb-2">
                          <div>
                            <p className="text-white text-sm font-semibold">
                              {history?.updatedBy?.name || 'Admin'}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {history?.updatedBy?.emailAddress}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-semibold ${
                                history?.action === 'create' ? 'text-green-500' : 
                                history?.action === 'update' ? 'text-blue-400' : 'text-red-500'
                            }`}>
                              {formatAction(history?.action)}
                            </p>
                            <p className="text-gray-500 text-[10px]">
                              {formatDateTime(history?.createdAt)}
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                        !isHistoryLoading && <p className="text-gray-500 text-center text-sm py-10">No history found</p>
                    )}
                  </ul>
                </div>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FeedbackPreview;
