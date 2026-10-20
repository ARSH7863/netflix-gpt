import { useRef } from "react";
import MovieCard from "./MovieCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-4 group/row">
      {/* Title */}
      <h2 className="text-base sm:text-lg md:text-2xl font-bold py-2 sm:py-3 text-white tracking-wide">
        {title}
      </h2>

      {/* Row with Navigation Controls */}
      <div className="relative">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-full w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition duration-200 cursor-pointer rounded-r"
          aria-label="Scroll left"
        >
          <FiChevronLeft className="text-2xl sm:text-3xl" />
        </button>

        <div
          ref={rowRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth pb-3 flex gap-2 sm:gap-3 md:gap-4"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movie={movie}
            />
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-full w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition duration-200 cursor-pointer rounded-l"
          aria-label="Scroll right"
        >
          <FiChevronRight className="text-2xl sm:text-3xl" />
        </button>
      </div>
    </section>
  );
};

export default MovieList;
