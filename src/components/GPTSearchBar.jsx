import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants.jsx";
import { useRef, useState } from "react";
import { generateResponse } from "../utils/gemini.jsx";
import { API_OPTIONS } from "../utils/constants.jsx";
import { addGPTMovieResult } from "../utils/gptSlice.jsx";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGPTSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    setLoading(true);
    setResponse("");

    try {
      const prompt = `
You are a movie recommendation system.
Rules:
- If the user query is NOT related to movies, genres, actors, moods, or film preferences,
  respond with exactly: Please enter valid query :)
- If valid, provide exactly 5 movie titles separated ONLY by commas.
- Do NOT include numbering (like 1, 2, 3), bullet points, years in parentheses, or extra text/explanations.
- Example output format: Inception, Interstellar, The Dark Knight, Memento, Dunkirk

User query: ${query}
      `;

      const gptResult = await generateResponse(prompt);

      if (!gptResult || gptResult.includes("Please enter valid query") || gptResult.includes("Error generating response")) {
        setResponse(gptResult || "Please enter valid query :)");
        return;
      }

      // Robustly parse movie names: strip leading numbering (1. Movie), markdown (*), quotes
      const movieNames = gptResult
        .split(/,|\n/)
        .map((m) => m.replace(/^\s*\d+[.)]\s*|\*+|"|'/g, "").trim())
        .filter((m) => m.length > 1)
        .slice(0, 5);

      if (movieNames.length === 0) {
        setResponse("Could not find suitable recommendations. Please try a different query.");
        return;
      }

      const tmdbResults = await Promise.all(
        movieNames.map((movie) => searchMovieTMDB(movie)),
      );

      dispatch(
        addGPTMovieResult({
          movieNames,
          movieResults: tmdbResults,
        }),
      );
    } catch (err) {
      console.error("GPT search error:", err);
      setResponse("Something went wrong. Please check your network or try again.");
    } finally {
      setLoading(false);
    }
  };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=true&page=1",
      API_OPTIONS,
    );

    const json = await data.json();
    return json.results;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Search Box */}
      <form
        className="w-full max-w-3xl bg-black rounded-lg p-4 flex flex-col sm:flex-row gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="flex-1 p-3 rounded text-black text-sm sm:text-base"
          placeholder={lang[languageKey].gptSearchPlaceholder}
        />

        <button
          className="bg-red-700 text-white px-6 py-3 rounded text-sm sm:text-base disabled:opacity-60"
          onClick={handleGPTSearchClick}
          disabled={loading}
        >
          {loading ? "Thinking..." : lang[languageKey].search}
        </button>
      </form>

      {/* AI Response */}
      {response && (
        <div className="w-full max-w-3xl mt-6 bg-gray-900 text-white p-4 rounded">
          <strong>AI Response:</strong>
          <p className="mt-2 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default GPTSearchBar;
