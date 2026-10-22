import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../utils/moviesSlice.jsx";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants.jsx";
import { IoClose } from "react-icons/io5";
import { FaStar, FaCalendarAlt } from "react-icons/fa";

const MovieModal = () => {
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movies.selectedMovie);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie?.id) return;

    let isMounted = true;
    setLoading(true);
    setTrailerKey(null);

    const fetchMovieTrailer = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await data.json();
        if (!isMounted) return;

        if (json.results && json.results.length > 0) {
          const trailer =
            json.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube") ||
            json.results.find((vid) => vid.site === "YouTube") ||
            json.results[0];
          if (trailer?.key) {
            setTrailerKey(trailer.key);
            return;
          }
        }

        // Fallback trailer if none exists
        setTrailerKey("6ZfuNTqbHE8");
      } catch (err) {
        console.error("Failed to load movie video:", err);
        setTrailerKey("6ZfuNTqbHE8");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovieTrailer();

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      isMounted = false;
      document.body.style.overflow = "unset";
    };
  }, [movie]);

  if (!movie) return null;

  const handleClose = () => {
    dispatch(setSelectedMovie(null));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm transition-all"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl bg-neutral-900 text-white rounded-xl overflow-hidden shadow-2xl border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-red-500 transition cursor-pointer"
          aria-label="Close modal"
        >
          <IoClose className="text-xl" />
        </button>

        {/* Video / Backdrop Header */}
        <div className="relative aspect-video w-full bg-black">
          {trailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
              title={movie.title || movie.name}
              allow="autoplay; encrypted-media; fullscreen"
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={IMG_CDN_URL + (movie.backdrop_path || movie.poster_path)}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-sm text-gray-300 animate-pulse">Loading preview...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-5 sm:p-7 flex flex-col gap-3">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
            {movie.title || movie.name || movie.original_title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
            {movie.vote_average ? (
              <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                <FaStar />
                {movie.vote_average.toFixed(1)} / 10
              </span>
            ) : null}

            {(movie.release_date || movie.first_air_date) && (
              <span className="flex items-center gap-1.5 text-gray-400">
                <FaCalendarAlt />
                {(movie.release_date || movie.first_air_date).split("-")[0]}
              </span>
            )}

            {movie.original_language && (
              <span className="uppercase px-2 py-0.5 rounded bg-neutral-800 text-gray-300 text-xs font-mono">
                {movie.original_language}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-h-48 overflow-y-auto pr-2 mt-1">
            {movie.overview || "No overview available for this title."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
