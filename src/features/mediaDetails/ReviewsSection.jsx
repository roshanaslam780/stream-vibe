import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SwiperControls from "@/components/ui/SwiperControls";
import RatingStars from "@/components/ui/RatingStars";
import { formatDate, formatRating } from "@/utils/format";
import DetailPanel from "./DetailPanel";

const ReviewsSection = ({ reviews = [], mediaType = "movie", className = "" }) => {
  const [swiper, setSwiper] = useState(null);
  const paginationRef = useRef(null);
  const mediaLabel = mediaType === "tv" ? "show" : "movie";

  useEffect(() => {
    if (!swiper || !paginationRef.current || swiper.destroyed) return;

    swiper.pagination.destroy();
    swiper.params.pagination.el = paginationRef.current;
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
  }, [swiper]);

  return (
    <DetailPanel title="Reviews" className={className}>
      {reviews.length ? (
        <div>
          <div className="overflow-hidden">
            <Swiper
              modules={[Pagination]}
              onSwiper={setSwiper}
              onBeforeInit={(instance) => {
                instance.params.pagination.el = paginationRef.current;
              }}
              slidesPerView={1}
              spaceBetween={16}
              pagination={{ type: "progressbar" }}
              breakpoints={{ 768: { slidesPerView: 2 } }}
            >
              {reviews.map((review) => {
                const author = review.author_details?.name || review.author || "TMDB user";
                const reviewRating = review.author_details?.rating;
                const normalizedRating = formatRating(reviewRating);

                return (
                  <SwiperSlide key={review.id} className="h-auto">
                    <article className="h-full rounded-lg border border-dark-15 bg-dark-06 p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="typo line-clamp-1 font-semibold">{author}</h3>
                          <p className="body-text text-xs">{formatDate(review.created_at)}</p>
                        </div>
                        {Number.isFinite(reviewRating) && (
                          <span
                            role="img"
                            aria-label={`Rated ${normalizedRating} out of 5`}
                            className="flex shrink-0 items-center gap-1.5 rounded-full border border-dark-15 px-2 py-1 text-sm text-neutral-60"
                          >
                            <RatingStars rating={normalizedRating} />
                            <span>{normalizedRating}</span>
                          </span>
                        )}
                      </div>
                      <p className="body-text line-clamp-5 [overflow-wrap:anywhere]">
                        {review.content || "This review has no written content."}
                      </p>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="mt-5 flex justify-center">
            <div className="w-fit">
              <SwiperControls
                swiper={swiper}
                paginationRef={paginationRef}
                variant="rounded"
                buttonShape="circle"
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="body-text">No reviews are available for this {mediaLabel} yet.</p>
      )}
    </DetailPanel>
  );
};

export default ReviewsSection;
