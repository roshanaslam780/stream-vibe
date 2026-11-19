import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Card from "./Card";
import CardImage from "./CardImage";
import { formatNumber } from "@/utils/format";

const PersonCard = ({ person }) => {
  const name = person.name || "Name unavailable";
  const personPath = `/person/${person.id}?name=${encodeURIComponent(name)}`;
  const knownFor = person.known_for
    ?.map((work) => work.title || work.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(" · ");

  return (
    <Card className="h-full">
      {person.profile_path ? (
        <CardImage
          imagePath={person.profile_path}
          imageTitle={name}
          to={personPath}
        />
      ) : (
        <Link
          to={personPath}
          aria-label={`View ${name} profile`}
          className="aspect-3/3.5 w-full flex-center overflow-hidden rounded-base bg-dark-06 text-neutral-60 2xl:rounded-xl"
        >
          <Icon icon="lucide:user-round" className="size-12" />
        </Link>
      )}

      <div className="flex min-w-0 grow flex-col gap-1">
        <Link
          to={personPath}
          className="typo line-clamp-1 text-sm font-semibold hover-underline 2xl:text-lg"
        >
          {name}
        </Link>
        <p className="body-text line-clamp-1 text-xs 2xl:text-sm">
          {person.known_for_department || "Person"}
        </p>
        {knownFor && (
          <p className="body-text mt-1 line-clamp-2 text-xs 2xl:text-sm">
            Known for: {knownFor}
          </p>
        )}
        <div className="mt-auto flex justify-end pt-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-dark-15 bg-dark-06 px-2.5 py-1 text-xs text-neutral-60">
            <Icon icon="lucide:trending-up" aria-hidden="true" />
            {formatNumber(person.popularity || 0)} popularity
          </span>
        </div>
      </div>
    </Card>
  );
};

const PersonCardSkeleton = () => (
  <Card className="h-full">
    <div className="aspect-3/3.5 w-full animate-pulse rounded-base bg-dark-06 2xl:rounded-xl" />
    <div className="flex flex-col gap-2">
      <div className="h-4 w-3/4 animate-pulse rounded bg-dark-06" />
      <div className="h-3 w-1/2 animate-pulse rounded bg-dark-06" />
      <div className="h-3 w-full animate-pulse rounded bg-dark-06" />
    </div>
  </Card>
);

export { PersonCardSkeleton };
export default PersonCard;
