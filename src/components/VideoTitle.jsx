import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>

      {/* <div className="flex gap-4">
        <button className="bg-gray-500 text-black p-4 px-10">Play</button>
        <button className="">More Info</button>
      </div> */}
      <div className="flex gap-4">
        {/* Play Button */}
        <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-300 transition">
          <FaPlay />
          Play
        </button>

        {/* More Info Button */}
        <button className="flex items-center gap-3 bg-gray-500/70 text-white px-10 py-4 rounded-md font-semibold hover:bg-gray-500 transition">
          <AiOutlineInfoCircle />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
