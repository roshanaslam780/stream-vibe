import { useApi } from "@/hooks/useAPI";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

import { getMoviesByGenreId } from "@/services/tmdb/movies";
import { getTvByGenreId } from "@/services/tmdb/tv";

import CardImage from "./CardImage";
import Card from "./Card";

const GenreCard = ({ genre, mediaType = "movie", popular = false }) => {
  const fetchFunction =
    mediaType === "movie" ? getMoviesByGenreId : getTvByGenreId;

  const {
    data: content,
    loading,
    error,
    refetch,
  } = useApi(fetchFunction, [
    genre.id,
    1,
    popular ? { sort_by: "popularity.desc" } : {},
  ]);

  // Validate genre
  if (!genre?.id || !genre?.name) {
    return null;
  }

  // Initial loading skeleton
  if (loading && !content) {
    return (
      <div className="bg-dark-10 border border-dark-15 p-5 rounded-base flex flex-col">
        <div className="grid grid-cols-2 gap-2.5 relative overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full aspect-3/3.5 bg-dark-06 rounded-lg animate-pulse"
            />
          ))}
          <span className="absolute inset-0 bg-linear-to-b from-transparent to-dark-10 rounded-md pointer-events-none" />
        </div>

        <div className="flex items-center justify-between gap-x-2 mt-3">
          <div className="h-5 w-24 bg-dark-06 rounded animate-pulse" />
          <div className="size-5 bg-dark-06 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Error state
  if (error && !content) {
    return (
      <div className="h-50 w-full flex-center flex-col gap-2">
        <p className="text-sm text-brand-45 text-center">{error}</p>

        <button
          onClick={refetch}
          className="text-sm underline hover:text-brand-45"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (!content?.results?.length && !loading) {
    return null;
  }

  const discoverPath =
    mediaType === "movie"
      ? `/discover/movie/${genre.id}`
      : `/discover/tv/${genre.id}`;

  return (
    <Card className="gap-0!">
      <div className="grid grid-cols-2 gap-2.5 relative overflow-hidden">
        {content?.results?.slice(0, 4).map((item) => (
          <CardImage
            imagePath={item.backdrop_path}
            imageTitle={mediaType === "movie" ? item.title : item.name}
            key={item.id}
          />
        ))}

        <span className="absolute inset-0 bg-linear-to-b from-transparent to-dark-10 rounded-md pointer-events-none" />
      </div>

      <div className="flex items-center justify-between gap-x-2 mt-3">
        <div className="flex flex-col items-start gap-1">
          {popular && (
            <h6 className="typo text-xs 2xl:text-sm font-semibold p-2 rounded-sm bg-brand-45 leading-none">
              Top 10 In
            </h6>
          )}

          <Link
            to={discoverPath}
            className="typo text-sm sm:text-base 2xl:text-lg font-semibold hover-underline"
          >
            {genre.name}
          </Link>
        </div>

        <Link
          to={discoverPath}
          aria-label={`Explore ${genre.name}`}
          className="size-5 sm:size-6 2xl:size-7.5 flex-center"
        >
          <Icon
            icon="fluent:arrow-right-12-regular"
            className="size-4 sm:size-5 2xl:size-6.5"
          />
        </Link>
      </div>
    </Card>
  );
};

export default GenreCard;
