
import Section from "@/layout/Section";
import DiscoverSlide from "./DiscoverSlide";
import ApiState from "@/components/common/ApiState";

import { useApi } from "@/hooks/useAPI";
import { getPopularMovies } from "@/services/tmdb/movies";
import { getPopularShows } from "@/services/tmdb/tv";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";

const DiscoverHero = ({ mediaType = "movie" }) => {
  const fetchFn =
    mediaType === "movie"
      ? getPopularMovies
      : getPopularShows;

  const {
    data,
    loading,
    error,
    refetch,
  } = useApi(fetchFn, [1, {}]);

  const contentSlice = data?.slice(0, 5) ?? [];

  return (
    <Section>
      <ApiState
        loading={loading}
        error={error}
        data={data}
        onRetry={refetch}
        emptyComponent={null}
        loadingComponent={
          <div className="h-50 sm:h-150 w-full flex-center">
            <div className="size-10 border-2 border-brand-45 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <div className="swiper-container rounded-xl">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={800}
            rewind
            autoplay={
              contentSlice.length > 1
                ? {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
          >
            {contentSlice.map((item) => (
              <SwiperSlide key={item.id}>
                <DiscoverSlide
                  mediaType={mediaType}
                  contentLength={contentSlice.length}
                  content={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ApiState>
    </Section>
  );
};

export default DiscoverHero;
