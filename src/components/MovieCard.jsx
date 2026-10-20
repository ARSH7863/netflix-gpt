import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { setSelectedMovie } from "../utils/moviesSlice";

const MovieCard = ({ posterPath, movie }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  const handleClick = () => {
    if (movie) {
      dispatch(setSelectedMovie(movie));
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex-shrink-0 pr-3
        w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56
        group
        cursor-pointer
      "
    >
      <div
        className="
          relative overflow-hidden rounded-md
          transform transition-transform duration-300 ease-out
          sm:group-hover:scale-105
          md:group-hover:scale-110
          group-hover:z-10
          shadow-md group-hover:shadow-xl
        "
      >
        <img
          src={IMG_CDN_URL + posterPath}
          alt={movie?.title || "Movie Card"}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* subtle overlay */}
        <div
          className="
            absolute inset-0
            bg-black/0
            group-hover:bg-black/25
            transition duration-300
          "
        />
      </div>
    </div>
  );
};

export default MovieCard;
