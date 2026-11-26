import { useApi } from "@/hooks/useAPI";
import { getPopularMovies } from "@/services/tmdb/movies";

import MarqueeBlock from "./MarqueeBlock";

const Marquee = ({
  speed = 120,
  direction = "ltr",
  pauseOnHover = false,
  repeater = Math.ceil(2),
  aspectRatio,
  size = "md",
  pageNo,
}) => {
  const { data: movies, error, loading } = useApi(getPopularMovies, [pageNo]);

  if (error) {
    return <div className="body-text">{error}</div>;
  }

  if (loading && !movies) {
    return (
      <div
        className="flex w-full min-w-0 max-w-full gap-2.5 overflow-hidden pe-2.5 2xl:gap-5 2xl:pe-5"
        role="status"
        aria-label="Loading popular movies"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={`shrink-0 animate-pulse rounded-md bg-dark-10 md:rounded-lg ${
              size === "xs" ? "w-20 md:w-24 2xl:w-28" :
              size === "sm" ? "w-24 md:w-30 2xl:w-36" :
              size === "lg" ? "w-36 md:w-48 2xl:w-60" : "w-30 md:w-40 2xl:w-50"
            } ${aspectRatio === "portrait" ? "aspect-1/1.25" : "aspect-2/1"}`}
          />
        ))}
        <span className="sr-only">Loading popular movies…</span>
      </div>
    );
  }

  if (movies) {
    return (
      <rs-marquee
        className={`flex items-stretch justify-start max-w-full overflow-hidden`}
        direction={direction}
        pause-on-hover={pauseOnHover}
        style={{ "--duration": `${speed}s` }}
      >
        {Array.from({ length: repeater }, (_, idx) => {
          return (
            <MarqueeBlock
              key={idx}
              movies={movies}
              aspectRatio={aspectRatio}
              size={size}
            />
          );
        })}
      </rs-marquee>
    );
  }
};

export default Marquee;
