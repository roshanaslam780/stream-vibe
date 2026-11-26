import { useState, useRef, useEffect } from "react";

import SwiperControls from "@/components/ui/SwiperControls";
import ApiState from "@/components/common/ApiState";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useApi } from "@/hooks/useAPI";

import { getMoviesGenres } from "@/services/tmdb/movies";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import GenreCard from "@/components/card/GenreCard";

const MoviesGenresSwiper = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [swiperInstance, setSwiperInstance] = useState(null);

  const paginationRef = useRef(null);

  // Fetch movie genres
  const {
    data: genresData,
    loading,
    error,
    refetch,
  } = useApi(getMoviesGenres, [{}]);

  const hasGenres = genresData?.length > 0;

  // The desktop and mobile control bars are separate DOM nodes. Rebind Swiper
  // after the responsive control swaps so pagination never points at an
  // unmounted bar (or falls back to Swiper's generated pagination element).
  useEffect(() => {
    if (!swiperInstance || !paginationRef.current || swiperInstance.destroyed) return;

    swiperInstance.pagination.destroy();
    swiperInstance.params.pagination.el = paginationRef.current;
    swiperInstance.pagination.init();
    swiperInstance.pagination.render();
    swiperInstance.pagination.update();
  }, [isMobile, swiperInstance]);

  return (
    <div id="movies-genres" className="flex scroll-mt-24 flex-col gap-y-10 md:gap-y-12.5 lg:gap-y-15 2xl:gap-y-20">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-5 flex-wrap md:flex-nowrap">
        <div className="flex flex-col gap-y-2.5 md:max-w-8/10">
          <h2 className="typo text-2xl font-bold lg:text-[28px] 2xl:text-[38px]">
            Our Genres
          </h2>
        </div>

        {!isMobile && hasGenres && (
          <SwiperControls
            swiper={swiperInstance}
            paginationRef={paginationRef}
          />
        )}
      </div>

      {/* Genres Swiper */}
      <div className="max-w-full block swiper-container">
        <ApiState
          loading={loading}
          error={error}
          data={genresData}
          onRetry={refetch}
          emptyComponent={null}
          loadingComponent={
            <div className="h-50 w-full flex-center">
              <div className="size-10 border-2 border-brand-45 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Swiper
            onSwiper={setSwiperInstance}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el = paginationRef.current;
            }}
            onDestroy={() => setSwiperInstance(null)}
            slidesPerView={1.75}
            spaceBetween={16}
            rewind
            pagination={{
              type: "progressbar",
            }}
            modules={[Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.75,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
          >
            {genresData?.map((genre) => (
              <SwiperSlide key={genre.id}>
                <GenreCard genre={genre} mediaType="movie" />
              </SwiperSlide>
            ))}
          </Swiper>
        </ApiState>
      </div>

      {/* Mobile Swiper Controls */}
      {isMobile && hasGenres && (
        <SwiperControls swiper={swiperInstance} paginationRef={paginationRef} />
      )}
    </div>
  );
};

export default MoviesGenresSwiper;
