import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice.jsx";

const useUpcomingMovies = () => {
  // Fetch Data from TMDB API and update our Redux store
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS,
      );
      const json = await data.json();
      if (json.results) {
        dispatch(addUpcomingMovies(json.results));
      }
    } catch (err) {
      console.error("Error fetching upcoming movies:", err);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
