import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.jsx";
import { DEFAULT_TRAILER_KEY } from "../utils/constants.jsx";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  const videoKey = trailerVideo?.key || DEFAULT_TRAILER_KEY;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {videoKey && (
        <iframe
          className="
            absolute top-1/2 left-1/2
            w-[130%] h-[130%]
            -translate-x-1/2 -translate-y-1/2
            pointer-events-none
          "
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoKey}&modestbranding=1&playsinline=1&enablejsapi=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
};

export default VideoBackground;
