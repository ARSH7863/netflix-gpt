import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.jsx";

const VideoBackground = ({ movieId }) => {
  // Fetch Trailer video & updating the Redux store with trailer video data
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/" + trailerVideo?.key}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
