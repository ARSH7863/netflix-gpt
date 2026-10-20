import React from "react";
import GPTSearchBar from "./GPTSearchBar.jsx";
import GPTMovieSuggestions from "./GPTMovieSuggestions.jsx";
import { BACKGROUND_IMAGE } from "../utils/constants.jsx";

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 pt-28 sm:pt-36 pb-20">
      {/* Background */}
      <img
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src={BACKGROUND_IMAGE}
        alt="background"
      />

      {/* Dark overlay for contrast */}
      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Content */}
      <div className="w-full max-w-5xl">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
