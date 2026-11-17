import { Icon } from "@iconify/react";
import RatingStars from "@/components/ui/RatingStars";
import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { handleImageError } from "@/utils/onImageError";
import { formatDuration, formatRating } from "@/utils/format";

const DetailGroup = ({ title, icon, children }) => (
  <section>
    <h2 className="mb-3 flex items-center gap-2 text-neutral-60">
      {icon && <Icon icon={icon} aria-hidden="true" />}
      {title}
    </h2>
    {children}
  </section>
);

const PersonCredit = ({ title, person }) => {
  const name = typeof person === "string" ? person : person?.name;

  return (
    <DetailGroup title={title}>
      {name ? (
        <div className="flex items-center gap-3 rounded-lg border border-dark-15 bg-dark-08 p-2.5">
          <div className="size-12 shrink-0 overflow-hidden rounded-md bg-dark-15">
            {person?.profile_path ? (
              <img
                src={getTmdbImageUrl(person.profile_path, "w185")}
                alt={name}
                className="cover-img"
                loading="lazy"
                onError={handleImageError}
              />
            ) : (
              <div className="size-full flex-center text-neutral-60">
                <Icon icon="lucide:user-round" />
              </div>
            )}
          </div>
          <p className="typo min-w-0 font-medium [overflow-wrap:anywhere]">{name}</p>
        </div>
      ) : <p className="body-text">N/A</p>}
    </DetailGroup>
  );
};

const MediaDetailsSidebar = ({ media, mediaType = "movie", className = "" }) => {
  const isTv = mediaType === "tv";
  const rating = formatRating(media?.vote_average);
  const releaseDate = isTv ? media?.first_air_date : media?.release_date;
  const director = media?.credits?.crew?.find((member) => member.job === "Director");
  const composer = media?.credits?.crew?.find((member) => member.job === "Original Music Composer")
    ?? media?.credits?.crew?.find((member) => member.department === "Sound");
  const creators = media?.created_by ?? [];
  const runtimes = isTv ? media?.episode_run_time : [media?.runtime];

  return (
    <aside className={`flex min-w-0 flex-col gap-5 rounded-xl border border-dark-15 bg-dark-10 p-5 md:gap-6 md:p-7.5 xl:sticky xl:top-6 xl:self-start ${className}`}>
      <DetailGroup title={isTv ? "First Air Year" : "Released Year"} icon="lucide:calendar-days">
        <p className="typo font-semibold">{releaseDate?.slice(0, 4) || "N/A"}</p>
      </DetailGroup>

      {isTv && (
        <>
          <DetailGroup title="Seasons" icon="lucide:clapperboard">
            <p className="typo font-semibold">{media?.number_of_seasons ?? "N/A"}</p>
          </DetailGroup>
          <DetailGroup title="Episodes" icon="lucide:tv">
            <p className="typo font-semibold">{media?.number_of_episodes ?? "N/A"}</p>
          </DetailGroup>
        </>
      )}

      <DetailGroup title={isTv ? "Episode Runtime" : "Runtime"} icon="lucide:clock-3">
        <p className="typo font-semibold">
          {runtimes?.length && runtimes[0] ? formatDuration(runtimes[0]) : "N/A"}
        </p>
      </DetailGroup>

      <DetailGroup title="Available Languages" icon="lucide:languages">
        <div className="flex flex-wrap gap-2">
          {media?.spoken_languages?.length ? media.spoken_languages.map((language) => (
            <span key={language.iso_639_1} className="rounded-md border border-dark-15 bg-dark-08 px-3 py-2 text-sm">
              {language.english_name || language.name}
            </span>
          )) : <span className="body-text">N/A</span>}
        </div>
      </DetailGroup>

      <DetailGroup title="Ratings" icon="lucide:star">
        <div className="rounded-lg border border-dark-15 bg-dark-08 p-3">
          <p className="typo mb-2 font-semibold">TMDB</p>
          <div className="flex flex-wrap items-center gap-2">
            <RatingStars rating={rating} />
            <span className="typo text-sm">{rating}/5</span>
            <span className="body-text text-xs">({media?.vote_count ?? 0} votes)</span>
          </div>
        </div>
      </DetailGroup>

      <DetailGroup title="Genres" icon="lucide:layout-grid">
        <div className="flex flex-wrap gap-2">
          {media?.genres?.length ? media.genres.map((genre) => (
            <span key={genre.id} className="rounded-md border border-dark-15 bg-dark-08 px-3 py-2 text-sm">
              {genre.name}
            </span>
          )) : <span className="body-text">N/A</span>}
        </div>
      </DetailGroup>

      {isTv ? creators.map((creator) => (
        <PersonCredit key={creator.id ?? creator.name} title="Creator" person={creator} />
      )) : (
        <>
          <PersonCredit title="Director" person={director} />
          <PersonCredit title="Music" person={composer} />
        </>
      )}
    </aside>
  );
};

export default MediaDetailsSidebar;
