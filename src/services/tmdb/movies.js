import { TMDBFetch } from "@/services/tmdb/api"

const getPopularMovies = async (
  page = 1,
  props = {},
  signal
) => {
  const movies = await TMDBFetch("/movie/popular", {
    language: "en-US",
    page,
    ...props,
  }, signal);

  return movies?.results ?? [];
};

const searchMovies = async (query, page = 1, signal) => {
  return TMDBFetch("/search/movie", {
    language: "en-US",
    query,
    page,
    include_adult: false,
  }, signal);
};


const getMoviesGenres = async (props = {}, signal) => {
  const genres = await TMDBFetch("/genre/movie/list", {
    language: "en-US",
    ...props,
  }, signal);

  return genres?.genres ?? [];
};


// const getMoviesByGenreId = async (
//   genreId,
//   props = {},
//   signal
// ) => {
//   const movies = await TMDBFetch("/discover/movie", {
//     language: "en-US",
//     with_genres: genreId,
//     ...props,
//   }, signal);

//   return movies ?? {};
// };

const getMoviesByGenreId = async (
  genreId,
  page = 1,
  props = {},
  signal
) => {
  return TMDBFetch("/discover/movie", {
    language: "en-US",
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
    ...props,
  }, signal);
};


const getTrendingMovies = async (
  timeFrame = "day",
  props = {},
  signal
) => {
  const movies = await TMDBFetch(
    `/trending/movie/${timeFrame}`,
    {
      language: "en-US",
      sort_by: "popularity.desc",
      ...props,
    },
    signal
  );

  return movies?.results ?? [];
};


const getMovieDetailsById = async (movieId, signal) => {
  const movie = await TMDBFetch(`/movie/${movieId}`, {
    language: "en-US",
    append_to_response: "credits,reviews",
  }, signal);

  return movie ?? {};
};


const getNewlyReleasedMovies = async (
  page = 1,
  props = {},
  signal
) => {
  const movies = await TMDBFetch("/movie/now_playing", {
    language: "en-US",
    sort_by: "popularity.desc",
    page,
    ...props,
  }, signal);

  return movies?.results ?? [];
};


export {
  getPopularMovies,
  searchMovies,
  getMoviesGenres,
  getMoviesByGenreId,
  getTrendingMovies,
  getMovieDetailsById,
  getNewlyReleasedMovies,
};
