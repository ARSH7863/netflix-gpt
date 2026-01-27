import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.jsx";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice.jsx";

const useUpcomingMovies = () => {
  // Fetch Data from TMDB API and update our Redux store
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
