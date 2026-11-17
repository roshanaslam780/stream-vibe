import ShowsGenresSwiper from "@/components/carousels/shows/ShowsGenresSwiper";
import PopularInShowsGenreSwiper from "@/components/carousels/shows/PopularInShowsGenreSwiper";
import TrendingNowShowsSwiper from "@/components/carousels/shows/TrendingNowShowsSwiper";
import NewReleasedShowsSwiper from "@/components/carousels/shows/NewReleasedShowsSwiper";
import MustWatchShowsSwiper from "@/components/carousels/shows/MustWatchShowsSwiper";

const DiscoverShows = () => {
  return (
    <>
      <ShowsGenresSwiper />
      <PopularInShowsGenreSwiper />
      <TrendingNowShowsSwiper />
      <NewReleasedShowsSwiper />
      <MustWatchShowsSwiper />
    </>
  );
};

export default DiscoverShows;
