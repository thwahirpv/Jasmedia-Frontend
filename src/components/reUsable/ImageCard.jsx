import { Play } from "lucide-react";
import { motion } from "framer-motion"; // Fixed incorrect import

export default function ImageCard({data}) {
  return (
    <motion.div
      className="relative rounded-lg overflow-hidden group cursor-pointer border border-amber-50"
      whileTap={{ scale: 0.95, backgroundColor: "#10B981" }}
      whileHover={{ opacity: 1 }}
    >
      {/* Image */}
      <img
        src={data.thumbnail}
        alt="Burger project"
        className="w-full h-[450px] object-cover blur-xs"
      />

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition duration-300"
      />

      {/* Play Button */}
      {data.type != "image" ? ( 
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-white  bg-opacity-20 flex items-center justify-center">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>
       ) : (" ")}

      {/* Title (Appears on Hover) */}
      <motion.div
        className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition duration-300 font-family-poppins"
      >
        {data.title}
      </motion.div>
    </motion.div>
  );
}
