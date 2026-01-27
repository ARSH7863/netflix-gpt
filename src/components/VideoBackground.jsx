import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.jsx";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  return (
    <div className="w-full overflow-hidden">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
};

export default VideoBackground;
