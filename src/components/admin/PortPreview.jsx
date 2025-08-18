import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import noContentImage from "../../assets/images/no_data.png";
import { IoClose } from "react-icons/io5";
import { clearPortfolioPreview } from "../../features/portfolio/portfolioPreview";
import { collection } from "../../constants/constants";
import { historyThunk } from "../../features/history/historySlice";
import { set } from "date-fns";

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

const PortPreview = ({ isPreview, setIsPreview }) => {
  const {
    portfolioId,
    title,
    description,
    type,
    category,
    status,
    contentLink,
    createdAt,
    updatedAt,
    publicId,
  } = useSelector((state) => state.portfolioPreview);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const { isHistoryLoading, historyError } = useSelector(
    (state) => state.listHistory
  );
  const [collectionHistory, setCollectionHistory] = useState([]);
  const dispatch = useDispatch();

  const closePreview = () => {
    setIsPreview(false);
    dispatch(clearPortfolioPreview());
    setCollectionHistory([]);
  };

  const fetchHistory = async () => {
    try {
      const data = {
        collectionId: portfolioId,
        collectionName: collection.PORTFOLIO,
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
      className={`absolute left-0 right-0 opacity-10 h-screen py-10 transition-all overflow-hidden
    ${
      isPreview
        ? "bottom-0 items-center opacity-100 visible"
        : "invisible bottom-full"
    }`}
    >
      <div
        className="relative w-full h-full bg-light-white dark:bg-dark-blue-600 rounded-md flex flex-col items-center space-y-[60px]
        overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-light-gray-800 scrollbar-track-light-gray-300 dark:scrollbar-thumb-dark-blue-900 dark:scrollbar-track-dark-blue-300"
      >
        {/* close icon */}
        <div
          className="absolute text-light-gray-950 dark:text-dark-white top-4 right-4 cursor-pointer"
          onClick={closePreview}
        >
          <IoClose size={20} />
        </div>
        {/* title */}
        <div className="py-6">
          <h1 className="text-lg md:text-2xl font-medium text-light-gray-950 dark:text-dark-white">
            {title}
          </h1>
        </div>

        {/* content */}
        <div className="w-[60%] md:w-[40%] h-[250px] rounded-md bg-light-gray-50 flex justify-center items-center">
          {contentLink ? (
            type == "Video" ? (
              <video
                src={contentLink}
                controls
                className="w-full h-full rounded object-contain shadow-md"
              />
            ) : (
              <img
                className="w-full h-full object-contain rounded-md"
                onLoad={() => setIsContentLoading(false)}
                src={contentLink}
                alt=""
              />
            )
          ) : (
            <img className="w-[100px] rounded-md" src={noContentImage} />
          )}
        </div>

        {/* Discription */}
        <div className="px-[10px] md:px-[90px] flex justify-center items-center">
          <p className="text-light-gray-950 dark:text-dark-gray text-wrap text-center">
            {description}
          </p>
        </div>

        {/* history  and other details*/}
        <div className="w-full flex flex-col md:flex-row items-center md:justify-around py-[60px] px-3 space-y-[70px] md:space-y-0">
          
          <div className="flex justify-around items-center bg-light-gray-50 dark:bg-dark-blue-400 w-[300px] md:w-[350px] h-[200px] rounded-md p-3">
            <div className="space-y-0.5">
              <p className="text-light-gray-950 dark:text-dark-white">
                Category
              </p>
              <p className="text-light-gray-950 dark:text-dark-white">Status</p>
              <p className="text-light-gray-950 dark:text-dark-white">
                Create at
              </p>
              <p className="text-light-gray-950 dark:text-dark-white">
                Last update
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-light-gray-950 dark:text-dark-gray text-sm">
                {category}
              </p>
              <p
                className={`${
                  status ? "text-green-500" : "text-error"
                } text-sm`}
              >
                {status ? "Active" : "Deactive"}
              </p>
              <p className="text-light-gray-950 dark:text-dark-gray text-sm">
                {createdAt}
              </p>
              <p className="text-light-gray-950 dark:text-dark-gray text-sm">
                {updatedAt}
              </p>
            </div>
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
                  <li className="px-4">
                    <div className="flex justify-between py-1.5 space-x-7 border-b border-gray-400 dark:border-gray-600">
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
  );
};

export default PortPreview;
