import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.jsx";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        className="
          absolute top-1/2 left-1/2
          w-[120%] h-[120%]
          -translate-x-1/2 -translate-y-1/2
          pointer-events-none
        "
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
};

export default VideoBackground;
