import React, { useState, useEffect } from "react";
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

  return (
    <div
      className={`absolute left-0 right-0 opacity-10 h-screen py-10 transition-all overflow-hidden flex justify-center items-center
    ${
      isPreview
        ? "bottom-0 items-center opacity-100 visible"
        : "invisible bottom-full"
    }`}
    >
      <div className="relative w-fit bg-light-white dark:bg-dark-blue-600 rounded-md flex flex-col items-center px-[25px] md:px-[1  0px]">
        <div
          className="absolute text-light-gray-950 dark:text-dark-white top-4 right-4 cursor-pointer"
          onClick={closePreview}
        >
          <IoClose size={20} />
        </div>

        <div className="py-[30px] flex flex-col justify-center items-center space-y-[80px]">
          <div className="">
            <h1 className="text-2xl font-semibold text-light-gray-950 dark:text-dark-white">
              {name}
            </h1>
          </div>

          <div className="px-[10px] md:px-[100px] flex justify-center items-center">
            <p className="text-light-gray-950 dark:text-dark-gray text-wrap text-center">
              {feedback}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-[50px]">
            <div className="md:mt-[15px] m-auto bg-light-gray-50 dark:bg-dark-blue-400 rounded-md h-fit px-2 py-2">
              <table className="border-separate border-spacing-y-2 border-spacing-x-4 text-sm text-left rtl:text-right text-light-gray-950 dark:text-dark-white">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>
                      {status ? (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                          Inactive
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>{role}</td>
                  </tr>
                  <tr>
                    <td>Created at:</td>
                    <td>{createdAt}</td>
                  </tr>
                  <tr>
                    <td>Updated at:</td>
                    <td>{updatedAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="min-h-[150px] max-h-[250px] min-w-[200px] flex justify-center items-center rounded-md overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300">
              <ul className="flex flex-col h-full justify-center items-center">
                {isHistoryLoading && (
                  <span className="absolute right-1/2 top-[60px]">
                    <PuffLoader
                      color=""
                      className="dark:text-dark-white text-light-gray-800"
                      loading={isHistoryLoading}
                      height={10}
                      width={4}
                    />
                  </span>
                )}
                {historyError && (
                  <p className="text-[12px] text-error text-wrap text-center">
                    {historyError}
                  </p>
                )}
                {collectionHistory.length > 0 &&
                  collectionHistory.map((history, index) => (
                    <li className="px-4" key={index}>
                      <div className="flex justify-between  py-1.5 space-x-7 border-b border-gray-400 dark:border-gray-600">
                        <div>
                          <p className="text-light-gray-950 dark:text-dark-white text-sm font-[500] text-left">
                            {history?.updatedBy?.name || "Admin"}
                          </p>
                          <p className="text-gray-700 dark:text-dark-gray text-[12px] text-left">
                            {history?.updatedBy?.emailAddress}
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-sm font-[500] text-right text-${history?.action}`}
                          >
                            {formatAction(history?.action)}
                          </p>
                          <p className="text-[11px] text-right text-light-gray-950 dark:text-dark-white">
                            {formatDateTime(history?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPreview;
