import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-6">
      {/* Row-specific dark overlay */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-r
          from-black/90 via-black/80 to-black/60
        "
      />

      {/* Title */}
      <h1 className="text-base sm:text-lg md:text-3xl py-2 sm:py-3 md:py-4 text-white">
        {title}
      </h1>

      {/* Movie Row */}
      <div className="overflow-x-auto scrollbar-hide pb-4">
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
