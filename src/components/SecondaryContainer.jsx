import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies.nowPlayingMovies) return null;

  return (
    <section className="relative w-full bg-black">
      {/* Spacer so black starts under hero */}
      <div className="h-16 sm:h-20 md:h-24" />

      {/* Movie Rows */}
      <div
        className="
          relative z-20
          px-0 sm:px-2 md:px-6 lg:px-10
          -translate-y-24 sm:-translate-y-24 md:-translate-y-28 lg:-translate-y-32
        "
      >
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies.topRated} />
        <MovieList title="Popular" movies={movies.popularMovies} />
        <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
      </div>
    </section>
  );
};

export default SecondaryContainer;
