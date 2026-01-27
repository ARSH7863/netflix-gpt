import Header from "./Header.jsx";
import MainContainer from "./MainContainer.jsx";
import SecondaryContainer from "./SecondaryContainer.jsx";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.jsx";
import usePopularMovies from "../hooks/usePopularMovies.jsx";
import useTopRated from "../hooks/useTopRated.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcomingMovies();

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
