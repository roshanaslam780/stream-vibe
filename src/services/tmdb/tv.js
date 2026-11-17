
import { TMDBFetch } from "@/services/tmdb/api";

const getPopularShows = async (page = 1, props = {}, signal) => {
  const tv = await TMDBFetch("/tv/popular", {
    language: "en-US",
    page,
    ...props,
  }, signal);

  return tv?.results ?? [];
};


const getTvGenres = async (props = {}, signal) => {
  const tv = await TMDBFetch("/genre/tv/list", {
    language: "en-US",
    ...props,
  }, signal);

  return tv?.genres ?? [];
};


const getTvByGenreId = async (genreId, page = 1, props = {}, signal) => {
  return TMDBFetch("/discover/tv", {
    language: "en-US",
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
    ...props,
  }, signal);
};


const getTrendingTv = async (timeFrame = "day", props = {}, signal) => {
  const tv = await TMDBFetch(`/trending/tv/${timeFrame}`, {
    language: "en-US",
    sort_by: "popularity.desc",
    ...props,
  }, signal);

  return tv?.results ?? [];
};


const getTvDetailsById = async (series_id, signal) => {
  const tv = await TMDBFetch(`/tv/${series_id}`, {
    language: "en-US",
    append_to_response: "credits,reviews",
  }, signal);

  return tv ?? {};
};

const getTvSeasonDetails = async (series_id, season_number, signal) => {
  return TMDBFetch(`/tv/${series_id}/season/${season_number}`, {
    language: "en-US",
  }, signal);
};


const getNewlyReleasedTv = async (page = 1, props = {}, signal) => {
  const shows = await TMDBFetch("/tv/on_the_air", {
    language: "en-US",
    sort_by: "popularity.desc",
    page,
    ...props,
  }, signal);

  return shows?.results ?? [];
};


export {
  getPopularShows,
  getTvGenres,
  getTvByGenreId,
  getTrendingTv,
  getTvDetailsById,
  getTvSeasonDetails,
  getNewlyReleasedTv,
};
