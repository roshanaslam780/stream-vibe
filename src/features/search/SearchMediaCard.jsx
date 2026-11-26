import { Icon } from "@iconify/react";
import { Link } from "react-router";
import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { handleImageError } from "@/utils/onImageError";

const SearchMediaCard = ({ item, mediaType, compact = false }) => {
  const title = mediaType === "movie" ? item.title : item.name;
  const date = mediaType === "movie" ? item.release_date : item.first_air_date;
  const to = `/${mediaType === "movie" ? "movie" : "tv"}/${item.id}`;

  return (
    <Link
      to={to}
      className={compact
        ? "group flex w-28 shrink-0 flex-col gap-2 sm:w-32"
        : "group flex gap-4 rounded-xl border border-dark-15 bg-dark-10 p-3 transition-colors hover:border-dark-30 sm:p-4"}
    >
      <div className={compact
        ? "aspect-[2/3] w-full overflow-hidden rounded-lg bg-dark-06"
        : "aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-lg bg-dark-06 sm:w-32"}>
        {item.poster_path ? (
          <img
            src={getTmdbImageUrl(item.poster_path)}
            alt={`${title} poster`}
            loading="lazy"
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-60">
            <Icon icon="lucide:clapperboard" className="size-7" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className={compact ? "min-w-0" : "min-w-0 flex-1 py-1"}>
        <p className={`typo truncate font-semibold group-hover:text-brand-80 ${compact ? "text-sm" : "text-base sm:text-lg"}`}>
          {title || "Untitled"}
        </p>
        {!compact && (
          <>
            <p className="mt-1 text-xs capitalize text-neutral-60">
              {mediaType === "movie" ? "Movie" : "TV Show"}{date ? ` · ${date.slice(0, 4)}` : ""}
            </p>
            {item.overview && <p className="body-text mt-3 line-clamp-3 text-sm">{item.overview}</p>}
            {item.vote_average > 0 && (
              <p className="mt-3 flex items-center gap-1 text-sm text-neutral-70">
                <Icon icon="lucide:star" className="size-4 text-brand-50" aria-hidden="true" />
                {item.vote_average.toFixed(1)}
              </p>
            )}
          </>
        )}
      </div>
    </Link>
  );
};

export default SearchMediaCard;
