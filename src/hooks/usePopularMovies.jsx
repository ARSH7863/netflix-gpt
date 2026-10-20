import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice.jsx";

const usePopularMovies = () => {
  // Fetch Data from TMDB API and update our Redux store
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS,
      );
      const json = await data.json();
      if (json.results) {
        dispatch(addPopularMovies(json.results));
      }
    } catch (err) {
      console.error("Error fetching popular movies:", err);
    }
  };

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
  }, []);
};

export default usePopularMovies;
