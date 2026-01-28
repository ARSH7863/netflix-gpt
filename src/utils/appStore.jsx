import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import moviesReducer from "./moviesSlice.jsx";
import gptReducer from "./gptSlice.jsx";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
});

export default appStore;
