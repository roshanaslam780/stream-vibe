import SwiperControls from "@/components/ui/SwiperControls";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { getTrendingTv } from "@/services/tmdb/tv";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TrendingCard from "@/components/card/TrendingCard";

const TrendingNowShowsSwiper = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [trendingShows, setTrendingShows] = useState(null);

  const paginationRed = useRef(null);

  const paginationConfig = {
    el: paginationRed.current,
    type: "progressbar",
  };

  useEffect(() => {
    async function getShows() {
      const shows = await getTrendingTv();
      shows ? setTrendingShows(shows) : [];
    }

    getShows();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-10 md:gap-y-12.5 lg:gap-y-15 2xl:gap-y-20">
        <div className="flex items-center justify-between gap-5 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-y-2.5 md:max-w-8/10">
            <h2 className="typo text-2xl font-bold lg:text-[28px] 2xl:text-[38px]">
              Trending Now
            </h2>
          </div>
          {!isMobile && (
            <SwiperControls
              swiper={swiperInstance}
              paginationRef={paginationRed}
            />
          )}
        </div>
        <div className="max-w-full block swiper-container">
          {trendingShows ? (
            <Swiper
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              slidesPerView={1.75}
              spaceBetween={16}
              rewind
              pagination={paginationConfig}
              modules={[Pagination]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
            >
              {trendingShows.map((show) => (
                <SwiperSlide key={show.id}>
                  <TrendingCard content={show} mediaType="tv" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-50 w-full flex-center">
              <div className="size-10 border-2 border-brand-45 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        {isMobile && (
          <SwiperControls
            swiper={swiperInstance}
            paginationRef={paginationRed}
          />
        )}
      </div>
    </>
  );
};

export default TrendingNowShowsSwiper;
