import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList.jsx";

const GPTMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black bg-opacity-90 text-white">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieNames[index]}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
