import React from "react";
import GPTSearchBar from "./GPTSearchBar.jsx";
import GPTMovieSuggestions from "./GPTMovieSuggestions.jsx";
import { BACKGROUND_IMAGE } from "../utils/constants.jsx";

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start sm:justify-center px-4">
      {/* Background */}
      <img
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src={BACKGROUND_IMAGE}
        alt="background"
      />

      {/* Content */}
      <div className="w-full max-w-4xl mt-24 sm:mt-0">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
