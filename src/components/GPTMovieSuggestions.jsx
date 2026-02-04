import { useSelector } from "react-redux";
import MovieList from "./MovieList.jsx";

const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <section className="relative z-10 w-full mt-8 sm:mt-8 md:mt-10">
      {/* Content wrapper */}
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-14">
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </section>
  );
};

export default GPTMovieSuggestions;
