import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import "swiper/css";
import SwiperControls from "@/components/ui/SwiperControls";
import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { handleImageError } from "@/utils/onImageError";
import DetailPanel from "./DetailPanel";

const CastSection = ({ cast = [], mediaType = "movie", className = "" }) => {
  const [swiper, setSwiper] = useState(null);
  const getCharacter = (person) => mediaType === "tv"
    ? person.roles?.map((role) => role.character).filter(Boolean).join(", ") || "Cast"
    : person.character || "Cast";

  return (
    <DetailPanel
      title="Cast"
      className={className}
      action={cast.length > 0 && <SwiperControls swiper={swiper} variant="buttons" buttonShape="circle" />}
    >
      {cast.length ? (
        <div className="overflow-hidden">
          <Swiper
            onSwiper={setSwiper}
            slidesPerView={2.5}
            spaceBetween={12}
            breakpoints={{
              480: { slidesPerView: 3.5 },
              768: { slidesPerView: 5 },
              1100: { slidesPerView: 6 },
              1440: { slidesPerView: 8 },
            }}
          >
            {cast.slice(0, 20).map((person) => {
              const profilePath = person.id
                ? `/person/${person.id}?name=${encodeURIComponent(person.name || "")}`
                : null;
              const ProfileLink = profilePath ? Link : "div";

              return (
                <SwiperSlide key={person.cast_id ?? `${person.id}-${person.order}`}>
                  <ProfileLink
                    {...(profilePath ? { to: profilePath } : {})}
                    className="block overflow-hidden rounded-lg bg-dark-08 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-brand-45"
                    aria-label={profilePath ? `View ${person.name || "cast member"} profile` : undefined}
                  >
                    <div className="aspect-square">
                      {person.profile_path ? (
                        <img
                          src={getTmdbImageUrl(person.profile_path, "w185")}
                          alt={person.name}
                          className="cover-img"
                          loading="lazy"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="size-full flex-center text-neutral-60">
                          <Icon icon="lucide:user-round" className="size-9" />
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="typo line-clamp-1 text-xs font-semibold">{person.name}</p>
                      <p className="body-text line-clamp-1 text-xs">{getCharacter(person)}</p>
                    </div>
                  </ProfileLink>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <p className="body-text">Cast information is not available.</p>
      )}
    </DetailPanel>
  );
};

export default CastSection;
