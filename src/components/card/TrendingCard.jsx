import { getMovieDetailsById } from "@/services/tmdb/movies";
import { getTvDetailsById } from "@/services/tmdb/tv";
import { useApi } from "@/hooks/useAPI";
import { Icon } from "@iconify/react";
import CardImage from "./CardImage";
import Card from "./Card";
import { formatDuration, formatNumber } from "@/utils/format";

const TrendingCard = ({ content, mediaType }) => {
  const fetchFunction =
    mediaType === "movie" ? getMovieDetailsById : getTvDetailsById;

  const { data: media, loading, error } = useApi(fetchFunction, [content.id]);

  if (error) {
    return (
      <div className="h-50 w-full flex-center">
        <div className="text-sm text-brand-45">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-dark-10 border border-dark-15 p-5 rounded-base flex flex-col">
        <div className="grid grid-cols-2 gap-2.5 relative overflow-hidden">
          <div className="w-full h-auto aspect-3/3.5 bg-dark-06 rounded-lg overflow-hidden animate-pulse"></div>
          <span className="absolute inset-0 bg-linear-to-b from-transparent to-dark-10 rounded-md pointer-events-none"></span>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex flex-col items-start gap-0.5 2xl:gap-1">
            <h5 className="typo text-sm sm:text-base 2xl:text-lg font-semibold hover-underline h-5 bg-dark-06 animate-pulse"></h5>
          </div>
          <div className="size-5 sm:size-6 2xl:size-7.5 flex-center">
            <Icon
              icon="fluent:arrow-right-12-regular"
              className="size-4 sm:size-5 2xl:size-6.5"
            />
          </div>
        </div>
      </div>
    );
  }

  if (media) {
    const runTime =
      mediaType === "movie"
        ? media?.runtime || "N/A"
        : (media?.episode_run_time?.[0] || 0) *
            (media?.number_of_episodes || 0) || "N/A";
    return (
      <Card>
        <CardImage
          imagePath={media.poster_path}
          imageTitle={mediaType === "movie" ? media.title : media.name}
          to={mediaType === "movie" ? `/movie/${media.id}` : `/tv/${media.id}`}
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between p-[4px_8px_4px_4px] 2xl:p-[8px_10px_8px_8px] gap-x-0.5 2xl:gap-x-1 bg-dark-06 border border-dark-15 rounded-full ">
            <Icon
              icon="garden:clock-fill-12"
              className="text-neutral-60 size-4 2xl:size-5"
            />
            <div className="typo text-xs 2xl:text-base text-neutral-60 leading-none">
              {mediaType === "movie"
                ? formatDuration(runTime)
                : formatDuration(runTime)}
            </div>
          </div>
          {mediaType === "movie" ? (
            <div className="flex items-center justify-between p-[4px_8px_4px_4px] 2xl:p-[8px_10px_8px_8px] gap-x-0.5 2xl:gap-x-1 bg-dark-06 border border-dark-15 rounded-full ">
              <Icon
                icon="ant-design:eye-filled"
                className="text-neutral-60 size-5 2xl:size-6"
              />
              <div className="typo text-xs 2xl:text-base text-neutral-60 leading-none">
                {formatNumber(media.popularity)}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-[4px_8px_4px_4px] 2xl:p-[8px_10px_8px_8px] gap-x-0.5 2xl:gap-x-1 bg-dark-06 border border-dark-15 rounded-full ">
              <Icon
                icon="lucide-extended:gallery-vertical-end-filled"
                className="text-neutral-60 size-4 2xl:size-5"
              />
              <div className="typo text-xs 2xl:text-base text-neutral-60 leading-none">
                {media.number_of_seasons === 1
                  ? `${media.number_of_seasons} season`
                  : `${media.number_of_seasons} Seasons`}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
};

export default TrendingCard;
