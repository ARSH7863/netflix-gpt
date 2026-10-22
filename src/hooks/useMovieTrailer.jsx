import { useEffect } from "react";
import { API_OPTIONS, DEFAULT_TRAILER_KEY } from "../utils/constants.jsx";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice.jsx";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;
    getMovieVideos();
  }, [movieId]);

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS,
      );
      const json = await data.json();

      if (json.results && json.results.length > 0) {
        const filterData = json.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        const trailer = filterData.length > 0 ? filterData[0] : json.results[0];

        if (trailer?.key) {
          dispatch(addTrailerVideo(trailer));
          return;
        }
      }

      // Fallback if no results from TMDB
      dispatch(addTrailerVideo({ key: DEFAULT_TRAILER_KEY, name: "Trailer" }));
    } catch (err) {
      console.error("Error fetching movie trailer:", err);
      // Fallback so user always sees a working trailer
      dispatch(addTrailerVideo({ key: DEFAULT_TRAILER_KEY, name: "Trailer" }));
    }
  };
};

export default useMovieTrailer;
