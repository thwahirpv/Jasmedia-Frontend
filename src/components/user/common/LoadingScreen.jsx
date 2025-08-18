import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../store/rootSelector";

const MIN_LOADING_TIME = 2000; 

const LoadingScreen = () => {
  const isLoading = useSelector(selectIsLoading);
  const [showLoader, setShowLoader] = useState(false);
  const [scope, animate] = useAnimate();
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = Date.now();
      setShowLoader(true);
    } else {
      const elapsed = Date.now() - (startTimeRef.current || Date.now());
      const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

      const timer = setTimeout(() => setShowLoader(false), remaining);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!scope.current || !showLoader) return;

    animate(
      [
        [".path1", { pathLength: 1, pathOffset: [1, 0] }],
        [".path2", { pathLength: 1, pathOffset: [1, 0] }, { at: "<" }],
        [".path3", { pathLength: 1, pathOffset: [1, 0] }, { at: "<" }],
        [".path4", { pathLength: 1, pathOffset: [1, 0] }, { at: "<" }],
      ],
      {
        duration: 1.4,
        ease: "linear",
        repeat: Infinity,
      }
    );
  }, [scope, animate, showLoader]); 
  
  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-green"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.svg
            ref={scope}
            viewBox="0 0 1604.83 848.06"
            width="300"
            height="150"
            fill="none"
            stroke="white"
            strokeWidth="8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.path
              className="path1"
              initial={{ pathLength: 0.4, pathOffset: 1 }}
              d="M697.48,304.08V420.83l-55.63,55.62-17.06,17.06L600.27,518l-.33.35-5.46,5.47a94.21,94.21,0,0,1-64.15,25.11H514.76a5,5,0,0,1-5-5V481.41a5,5,0,0,1,5-5h110V304.08a5,5,0,0,1,5-5h62.77A5,5,0,0,1,697.48,304.08Z"
            />
            <motion.path
              className="path2"
              initial={{ pathLength: 0.4, pathOffset: 1 }}
              d="M1095,304.87V331.6a8.2,8.2,0,0,1-2.38,5.78l-85.51,86.26h-77a6.41,6.41,0,0,1-6.41-6.41V387.79l70.19-70.22a62.6,62.6,0,0,1,44.58-18.45h50.83A5.75,5.75,0,0,1,1095,304.87Z"
            />
            <motion.path
              className="path3"
              initial={{ pathLength: 0.4, pathOffset: 1 }}
              d="M1090.75,430.87v24.47a10,10,0,0,1-2.94,7.1l-67.28,67.28A63,63,0,0,1,976,548.16H925.82a6.43,6.43,0,0,1-6.43-6.43V516.46a10,10,0,0,1,2.9-7.06l85-85.76h76.26A7.23,7.23,0,0,1,1090.75,430.87Z"
            />
            <motion.path
              className="path4"
              initial={{ pathLength: 0.4, pathOffset: 1 }}
              d="M923.64,304.15v83.69l-53,53-9.37,9.37a4.92,4.92,0,0,1-8.4-3.48V371.25H768.28V543.11a4.92,4.92,0,0,1-4.67,4.92c-1.64.09-3.29.13-5,.13H702.4a4.92,4.92,0,0,1-4.92-4.92V420.84L804.79,313.53a82.69,82.69,0,0,1,46.63-14.31h67.3A4.93,4.93,0,0,1,923.64,304.15Z"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
