import { useSelector } from "react-redux";
import lang from "../utils/languageConstants.jsx";
import { useRef, useState } from "react";
import { generateResponse } from "../utils/gemini.jsx";

const GPTSearchBar = () => {
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
      const prompt =
        "You are a movie recommendation system. " +
        "Suggest exactly top 5 movies. " +
        "Return only movie names, comma separated. " +
        "User query: " +
        query;

      const result = await generateResponse(prompt);
      setResponse(result);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex flex-col items-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[languageKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg"
          onClick={handleGPTSearchClick}
          disabled={loading}
        >
          {loading ? "Thinking..." : lang[languageKey].search}
        </button>
      </form>

      {response && (
        <div className="w-1/2 mt-6 bg-gray-900 text-white p-4 rounded">
          <strong>AI Response:</strong>
          <p className="mt-2 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default GPTSearchBar;
