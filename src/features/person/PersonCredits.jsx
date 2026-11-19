import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Card from "@/components/card/Card";
import CardImage from "@/components/card/CardImage";
import DetailPanel from "@/features/mediaDetails/DetailPanel";

const PAGE_SIZE = 12;

const PersonCreditCard = ({ credit }) => {
  const mediaType = credit.media_type;
  const name = credit.title || credit.name || "Untitled";
  const mediaPath = `/${mediaType}/${credit.id}`;
  const year = (credit.release_date || credit.first_air_date || "").slice(0, 4);
  const role = credit.character || credit.job;

  return (
    <Card className="h-full">
      {credit.poster_path ? (
        <CardImage imagePath={credit.poster_path} imageTitle={name} to={mediaPath} />
      ) : (
        <Link
          to={mediaPath}
          aria-label={`View ${name}`}
          className="aspect-3/3.5 w-full flex-center overflow-hidden rounded-base bg-dark-06 text-neutral-60 2xl:rounded-xl"
        >
          <Icon icon="lucide:clapperboard" className="size-10" />
        </Link>
      )}
      <div className="min-w-0">
        <Link to={mediaPath} className="typo line-clamp-2 text-sm font-semibold hover-underline 2xl:text-base">
          {name}
        </Link>
        <p className="body-text mt-1 text-xs">
          {[year, role].filter(Boolean).join(" · ") || (mediaType === "tv" ? "TV Series" : "Movie")}
        </p>
      </div>
    </Card>
  );
};

const PersonCredits = ({ credits = {} }) => {
  const [mediaFilter, setMediaFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredCredits = useMemo(() => {
    const combined = new Map();
    [...(credits.cast || []), ...(credits.crew || [])].forEach((credit) => {
      if (!credit.id || !["movie", "tv"].includes(credit.media_type)) return;
      const key = `${credit.media_type}-${credit.id}`;
      const existing = combined.get(key);
      if (!existing || (!existing.character && credit.character)) {
        combined.set(key, credit);
      }
    });

    const items = Array.from(combined.values()).filter((credit) =>
      mediaFilter === "all" || credit.media_type === mediaFilter,
    );

    return items.sort((a, b) => {
      if (sortBy === "newest") {
        const dateA = a.release_date || a.first_air_date || "";
        const dateB = b.release_date || b.first_air_date || "";
        return dateB.localeCompare(dateA);
      }
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }, [credits.cast, credits.crew, mediaFilter, sortBy]);

  const setFilter = (filter) => {
    setMediaFilter(filter);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <DetailPanel title="Known For">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter credits by type">
          {[{ id: "all", label: "All" }, { id: "movie", label: "Movies" }, { id: "tv", label: "TV Shows" }].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={mediaFilter === id}
              onClick={() => setFilter(id)}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                mediaFilter === id
                  ? "border-brand-45 bg-brand-45 text-white"
                  : "border-dark-15 bg-dark-08 text-neutral-60 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-60">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="min-h-10 rounded-lg border border-dark-15 bg-dark-08 px-3 text-white outline-none focus:border-brand-45"
          >
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      {filteredCredits.length ? (
        <>
          <p className="body-text mb-4 text-xs">
            {filteredCredits.length} {filteredCredits.length === 1 ? "credit" : "credits"}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:gap-5">
            {filteredCredits.slice(0, visibleCount).map((credit) => (
              <PersonCreditCard
                key={`${credit.media_type}-${credit.id}`}
                credit={credit}
              />
            ))}
          </div>
          {visibleCount < filteredCredits.length && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-dark-15 bg-dark-08 px-5 text-sm font-semibold text-white transition-colors hover:bg-dark-15"
              >
                Show more
                <Icon icon="lucide:chevron-down" aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="body-text py-10 text-center">No credits found for this filter.</p>
      )}
    </DetailPanel>
  );
};

export default PersonCredits;
