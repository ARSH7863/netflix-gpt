import Header from "./Header.jsx";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer.jsx";
import SecondaryContainer from "./SecondaryContainer.jsx";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
        Main Container
          - Video Background
          - Video Title
        
        Secondary Container
          - Movie List * n
          - Card * n
       */}
    </div>
  );
};

export default Browse;
