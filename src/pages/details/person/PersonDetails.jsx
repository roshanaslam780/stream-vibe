import { useState } from "react";
import { Icon } from "@iconify/react";
import { useParams, useSearchParams } from "react-router";
import { useApi } from "@/hooks/useAPI";
import { getPersonDetailsById } from "@/services/tmdb/people";
import Section from "@/layout/Section";
import DetailPanel from "@/features/mediaDetails/DetailPanel";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PersonCredits from "@/features/person/PersonCredits";
import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { handleImageError } from "@/utils/onImageError";

const genderLabels = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

const PersonDetailsSkeleton = () => (
  <div className="grid animate-pulse gap-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-8">
    <div className="space-y-5">
      <div className="aspect-[2/3] rounded-xl bg-dark-10" />
      <div className="h-56 rounded-xl bg-dark-10" />
    </div>
    <div className="space-y-5">
      <div className="h-32 rounded-xl bg-dark-10" />
      <div className="h-56 rounded-xl bg-dark-10" />
      <div className="h-[36rem] rounded-xl bg-dark-10" />
    </div>
  </div>
);

const PersonDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [biographyExpanded, setBiographyExpanded] = useState(false);
  const { data: person, loading, error, refetch } = useApi(getPersonDetailsById, [id]);
  const fallbackName = searchParams.get("name");
  const displayName = person?.name || fallbackName || "Person";
  const isInitialLoading = loading || (!person && !error);
  const biography = person?.biography || "No biography is available for this person.";
  const hasLongBiography = biography.length > 600;
  const knownCredits = (person?.combined_credits?.cast?.length || 0)
    + (person?.combined_credits?.crew?.length || 0);

  return (
    <Section>
      <div className="mb-6 md:mb-8">
        <Breadcrumbs items={[
          { label: "Home", to: "/" },
          { label: "People", to: "/person" },
          { label: displayName },
        ]} />
      </div>

      {error ? (
        <div className="flex min-h-96 flex-col items-center justify-center gap-4 text-center">
          <Icon icon="lucide:user-round-x" className="size-12 text-neutral-60" />
          <div>
            <h1 className="typo text-xl font-semibold">Could not load this profile</h1>
            <p className="body-text mt-2">{error}</p>
          </div>
          <button type="button" onClick={refetch} className="body-text underline hover:text-white">
            Try again
          </button>
        </div>
      ) : isInitialLoading ? (
        <PersonDetailsSkeleton />
      ) : person ? (
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-8 2xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="flex min-w-0 flex-col gap-5">
            <div className="overflow-hidden rounded-xl border border-dark-15 bg-dark-10 p-3 sm:p-4">
              <div className="aspect-[2/3] max-h-[520px] overflow-hidden rounded-lg bg-dark-06">
                {person.profile_path ? (
                  <img
                    src={getTmdbImageUrl(person.profile_path, "h632")}
                    alt={displayName}
                    className="cover-img"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="size-full flex-center text-neutral-60">
                    <Icon icon="lucide:user-round" className="size-16" />
                  </div>
                )}
              </div>
            </div>

            <DetailPanel title="Personal Info">
              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="body-text text-xs">Known For</dt>
                  <dd className="typo mt-1 text-sm font-medium">
                    {person.known_for_department || "Not available"}
                  </dd>
                </div>
                <div>
                  <dt className="body-text text-xs">Known Credits</dt>
                  <dd className="typo mt-1 text-sm font-medium">{knownCredits || "Not available"}</dd>
                </div>
                <div>
                  <dt className="body-text text-xs">Gender</dt>
                  <dd className="typo mt-1 text-sm font-medium">
                    {genderLabels[person.gender] || "Not specified"}
                  </dd>
                </div>
                <div>
                  <dt className="body-text text-xs">Birthday</dt>
                  <dd className="typo mt-1 text-sm font-medium">{person.birthday || "Not available"}</dd>
                </div>
                {person.deathday && (
                  <div>
                    <dt className="body-text text-xs">Day of Death</dt>
                    <dd className="typo mt-1 text-sm font-medium">{person.deathday}</dd>
                  </div>
                )}
                <div>
                  <dt className="body-text text-xs">Place of Birth</dt>
                  <dd className="typo mt-1 text-sm font-medium">
                    {person.place_of_birth || "Not available"}
                  </dd>
                </div>
              </dl>

              {person.also_known_as?.length > 0 && (
                <details className="mt-5 border-t border-dark-15 pt-4">
                  <summary className="typo cursor-pointer text-sm font-semibold">
                    Also Known As ({person.also_known_as.length})
                  </summary>
                  <ul className="mt-3 flex flex-col gap-2">
                    {person.also_known_as.map((alias) => (
                      <li key={alias} className="body-text text-xs">{alias}</li>
                    ))}
                  </ul>
                </details>
              )}

              {(person.homepage || person.external_ids?.imdb_id) && (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-dark-15 pt-4">
                  {person.homepage && (
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-dark-15 bg-dark-08 px-3 text-sm hover:border-dark-25"
                    >
                      Website <Icon icon="lucide:external-link" aria-hidden="true" />
                    </a>
                  )}
                  {person.external_ids?.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${person.external_ids.imdb_id}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-dark-15 bg-dark-08 px-3 text-sm hover:border-dark-25"
                    >
                      IMDb <Icon icon="lucide:external-link" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </DetailPanel>
          </aside>

          <main className="flex min-w-0 flex-col gap-5">
            <header className="rounded-xl border border-dark-15 bg-dark-10 p-5 sm:p-7.5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="typo text-2xl font-bold sm:text-3xl 2xl:text-4xl">
                    {displayName}
                  </h1>
                  {person.known_for_department && (
                    <p className="body-text mt-2">{person.known_for_department}</p>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-dark-15 bg-dark-08 px-3 py-2 text-sm text-neutral-60">
                  <Icon icon="lucide:film" aria-hidden="true" />
                  {knownCredits} {knownCredits === 1 ? "Credit" : "Credits"}
                </span>
              </div>
            </header>

            <DetailPanel title="Biography">
              <p className={`body-text whitespace-pre-line ${!biographyExpanded && hasLongBiography ? "line-clamp-6" : ""}`}>
                {biography}
              </p>
              {hasLongBiography && (
                <button
                  type="button"
                  onClick={() => setBiographyExpanded((expanded) => !expanded)}
                  aria-expanded={biographyExpanded}
                  className="mt-3 text-sm font-semibold text-white underline decoration-brand-45 underline-offset-4"
                >
                  {biographyExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </DetailPanel>

            <PersonCredits credits={person.combined_credits} />
          </main>
        </div>
      ) : null}
    </Section>
  );
};

export default PersonDetails;
