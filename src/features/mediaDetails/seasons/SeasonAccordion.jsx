import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/clsx";
import { getTvSeasonDetails } from "@/services/tmdb/tv";
import SeasonEpisode from "./SeasonEpisode";

const SeasonAccordion = ({
  seriesId,
  season,
  isOpen,
  onToggle,
  fallbackImage,
}) => {
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestRef = useRef(null);

  const loadSeason = useCallback(() => {
    if (seasonData || requestRef.current) return requestRef.current;

    setLoading(true);
    setError(null);
    const request = getTvSeasonDetails(seriesId, season.season_number)
      .then((result) => {
        setSeasonData(result);
        return result;
      })
      .catch((requestError) => {
        setError(requestError.message || "Could not load this season.");
      })
      .finally(() => {
        requestRef.current = null;
        setLoading(false);
      });

    requestRef.current = request;
    return request;
  }, [seasonData, season.season_number, seriesId]);

  useEffect(() => {
    if (isOpen) loadSeason();
  }, [isOpen, loadSeason]);

  const episodeCount =
    season.episode_count ?? seasonData?.episodes?.length ?? 0;
  const seasonLabel =
    season.season_number === 0
      ? season.name || "Specials"
      : `Season ${String(season.season_number).padStart(2, "0")}`;

  return (
    <section
      className={cn(
        `overflow-hidden rounded-xl border border-dark-15 bg-dark-06 p-3 flex flex-col items-stretch`,
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`season-${seriesId}-${season.season_number}-episodes`}
          onClick={onToggle}
          className={cn(
            "flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5",
            isOpen && "border-b border-dark-15",
          )}
        >
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
            <span className="typo text-sm font-semibold sm:text-base 2xl:text-[20px]">
              {seasonLabel}
            </span>
            <span className="text-xs sm:text-sm 2xl:text-base text-neutral-60">
              {episodeCount} {episodeCount === 1 ? "Episode" : "Episodes"}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-dark-15 bg-dark-08 p-2 text-neutral-60 md:size-11"
          >
            <Icon
              icon="fa6-solid:arrow-down-long"
              className={cn(`size-4 md:size-5 transition-all ${isOpen ? "-scale-y-100" : "scale-y-100"}`)}
            />
          </span>
        </button>
      </h3>

      <div
        id={`season-${seriesId}-${season.season_number}-episodes`}
        aria-hidden={!isOpen}
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-(--transition-1)",
          isOpen
            ? "grid-rows-[1fr] opacity-100 py-4"
            : "grid-rows-[0fr] opacity-0 py-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-4 max-h-250 overflow-y-auto pe-3 sm:mx-5 sm:pe-4">
            {loading && !seasonData ? (
              <div className="flex min-h-32 items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-2 border-brand-45 border-t-transparent" />
              </div>
            ) : error && !seasonData ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <p className="body-text text-brand-45">{error}</p>
                <button
                  type="button"
                  onClick={loadSeason}
                  className="body-text underline hover:text-white"
                >
                  Try again
                </button>
              </div>
            ) : seasonData?.episodes?.length ? (
              seasonData.episodes.map((episode) => (
                <SeasonEpisode
                  key={episode.id}
                  episode={episode}
                  fallbackImage={fallbackImage}
                />
              ))
            ) : (
              <p className="body-text py-6">
                No episode information is available for this season.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonAccordion;
