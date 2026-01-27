import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div
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
        "
      >
        <img
          src={IMG_CDN_URL + posterPath}
          alt="Movie Card"
          className="w-full h-full object-cover"
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
