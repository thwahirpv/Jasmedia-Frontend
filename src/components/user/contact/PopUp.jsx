import { SUCCESS } from "@/constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import successIcon from '../../../assets/images/checked.png'
import failedIcon from '../../../assets/images/cancel.png'

const Popup = ({ show, type, message }) => {
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      maxWidth: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      maxWidth: 400,
      transition: { duration: 0.4, type: "spring", stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      maxWidth: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-user-smokewhite px-6 py-3 rounded-lg shadow-xl text-[12px] md:text-sm sm:text-base ${
            type === SUCCESS ? "border-2 border-green text-[#0aa06e]" : "border-2 border-green text-[#ad0e0e]"
          }`}
        >
          <p className="flex items-center justify-center gap-3 text-left">
            <span>
                {
                    type == SUCCESS ?
                        <img className="w-[40px]" src={successIcon} alt="" />
                    :
                        <img className="w-[40px]" src={failedIcon} alt="" />
                }
            </span>
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
