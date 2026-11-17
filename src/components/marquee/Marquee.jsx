import { useApi } from "@/hooks/useAPI";
import { getPopularMovies } from "@/services/tmdb/movies";

import MarqueeBlock from "./MarqueeBlock";

const Marquee = ({
  speed = 120,
  direction = "ltr",
  pauseOnHover = false,
  repeater = Math.ceil(2),
  aspectRatio,
  pageNo,
}) => {
  const { data: movies, error, loading } = useApi(getPopularMovies, [pageNo]);

  if (error) {
    return <div className="body-text">{error}</div>;
  }

  if (loading && !movies) {
    return <div>Loading</div>;
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
            <MarqueeBlock key={idx} movies={movies} aspectRatio={aspectRatio} />
          );
        })}
      </rs-marquee>
    );
  }
};

export default Marquee;
