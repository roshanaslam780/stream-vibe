import { useSwiper } from "swiper/react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { Icon } from "@iconify/react";
import Button, { IconButton } from "@/components/ui/button/Button";
import CustomPagination from "@/components/ui/CustomPagination";

const DiscoverSlide = ({ content, mediaType, contentSlice, type = "swiper" }) => {
  const swiper = useSwiper();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isMovie = mediaType === "movie" ? true : false;

  const info = {
    title: isMovie ? content.title : content.name,
    backdrop: content.backdrop_path,
    poster: content.poster_path,
    description: content.overview,
  };

  const handleNext = () => {
    swiper?.slideNext();
  };
  const handlePrev = () => {
    swiper?.slidePrev();
  };

  return (
    <div className="w-full max-w-full h-auto sm:min-h-150 aspect-3/4 sm:aspect-video rounded-xl overflow-hidden relative p-px bg-linear-to-b from-dark-15 to-transparent">
      <div className="w-full h-full min-h-inherit rounded-inherit overflow-hidden">
        <img
          className="cover-img min-h-inherit"
          src={
            isMobile
              ? getTmdbImageUrl(info.poster, "w500")
              : getTmdbImageUrl(info.backdrop, "w1280")
          }
          alt={info.title}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-dark-08 from-0% to-95%">
        <div className="w-full h-full flex flex-col justify-end p-6 pb-5 md:p-10 md:pb-6 2xl:p-12.5 2xl:pb-6 gap-5 md:gap-10 2xl:gap-12.5">
          <div className="flex flex-col gap-5 md:gap-6 2xl:gap-7.5 items-center justify-center max-w-4xl mx-auto">
            <div className="flex flex-col gap-0.5 text-center">
              <h2 className="typo font-bold text-[24px] md:text-[30px] 2xl:text-[38px] text-balance">
                {info.title}
              </h2>
              <div className="hidden sm:block">
                <p className="body-text line-clamp-3">{info.description}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button className="w-full sm:w-fit">
                <Icon icon="gravity-ui:play-fill" />
                Plan Now
              </Button>
              <div className="flex items-center gap-2 2xl:gap-2.5">
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:plus" />
                </IconButton>
                <IconButton variant="secondary">
                  <Icon icon="bx:like" />
                </IconButton>
                <IconButton variant="secondary">
                  <Icon icon="bi:volume-up" />
                </IconButton>
              </div>
            </div>
          </div>
          {type === "swiper" && (
            <div className="flex items-center justify-between">
              <IconButton variant="secondary" onClick={handlePrev} aria-label="Previous slide">
                <Icon icon="fa:angle-left" />
              </IconButton>
              <CustomPagination swiper={swiper} length={contentSlice} />
              <IconButton variant="secondary" onClick={handleNext} aria-label="Next slide">
                <Icon icon="fa:angle-right" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverSlide;
