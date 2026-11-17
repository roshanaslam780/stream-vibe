import MoviesGenresSwiper from "@/components/carousels/movies/MoviesGenresSwiper";
import PopularInMovieGenreSwiper from "@/components/carousels/movies/PopularInMovieGenreSwiper";
import TrendingNowMoviesSwiper from "@/components/carousels/movies/TrendingNowMoviesSwiper";
import NewReleasedMoviesSwiper from "@/components/carousels/movies/NewReleasedMoviesSwiper";
import MustWatchMoviesSwiper from "@/components/carousels/movies/MustWatchMoviesSwiper";

const DiscoverMovies = () => {
  return (
    <>
      <MoviesGenresSwiper />
      <PopularInMovieGenreSwiper />
      <TrendingNowMoviesSwiper />
      <NewReleasedMoviesSwiper />
      <MustWatchMoviesSwiper />
    </>
  );
};

export default DiscoverMovies;
