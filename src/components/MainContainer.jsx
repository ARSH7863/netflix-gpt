import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <section
      className="
        relative
        w-full
        h-[70vh]
        sm:h-[80vh]
        md:h-screen
        overflow-hidden
      "
    >
      {/* Video */}
      <VideoBackground movieId={id} />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Title + Actions */}
      <div className="absolute inset-0 z-20">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </section>
  );
};

export default MainContainer;
