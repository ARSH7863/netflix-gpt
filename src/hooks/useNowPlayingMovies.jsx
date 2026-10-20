import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice.jsx";

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update our Redux store
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS,
      );
      const json = await data.json();
      if (json.results) {
        dispatch(addNowPlayingMovies(json.results));
      }
    } catch (err) {
      console.error("Error fetching now playing movies:", err);
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
