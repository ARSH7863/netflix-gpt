import React from "react";
import GPTSearchBar from "./GPTSearchBar.jsx";
import GPTMovieSuggestions from "./GPTMovieSuggestions.jsx";
import { BACKGROUND_IMAGE } from "../utils/constants.jsx";

const GPTSearch = () => {
  return (
    <div>
      <div className="">
        <img
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={BACKGROUND_IMAGE}
          alt="background"
        />
      </div>
      <GPTSearchBar></GPTSearchBar>
      <GPTMovieSuggestions></GPTMovieSuggestions>
    </div>
  );
};

export default GPTSearch;
