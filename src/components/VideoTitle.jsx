import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* Content */}
      <div
        className="
          relative h-full
          flex items-end sm:items-center
          px-4 sm:px-8 md:px-16 lg:px-24
          pb-16 sm:pb-0
          text-white
        "
      >
        <div className="max-w-xl sm:max-w-2xl">
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>

          {/* Description (MD+ only) */}
          <p
            className="
              hidden md:block
              mt-3 sm:mt-4
              text-base md:text-lg
              text-gray-200
              leading-relaxed
              line-clamp-3
            "
          >
            {overview}
          </p>

          {/* Actions */}
          <div className="mt-5 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            {/* Play */}
            <button className="flex items-center gap-2 sm:gap-3 bg-white text-black px-5 sm:px-8 py-2 rounded font-semibold hover:bg-gray-200 transition">
              <FaPlay className="text-xs sm:text-sm" />
              Play
            </button>

            {/* More Info */}
            <button className="flex items-center gap-2 sm:gap-3 bg-gray-500/50 text-white px-4 sm:px-6 py-2 rounded font-semibold hover:bg-gray-500/70 transition">
              <AiOutlineInfoCircle className="text-lg sm:text-xl" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
