import { useState } from "react";
import { useApi } from "@/hooks/useAPI";
import { getPopularPeople } from "@/services/tmdb/people";
import Section from "@/layout/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Pagination from "@/components/ui/Pagination";
import PersonCard, { PersonCardSkeleton } from "@/components/card/PersonCard";

const Person = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useApi(getPopularPeople, [page]);
  const isInitialLoading = loading || (!data && !error);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section>
      <div className="mb-7 flex flex-col gap-3 md:mb-9">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "People" }]}
        />
        <div>
          <h1 className="typo text-2xl font-bold md:text-3xl 2xl:text-4xl">
            Popular People
          </h1>
          <p className="body-text mt-2">
            Explore the people making movies and television memorable.
          </p>
        </div>
      </div>

      {error ? (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
          <p className="body-text text-brand-45">
            Could not load popular people: {error}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="body-text underline hover:text-white"
          >
            Try again
          </button>
        </div>
      ) : isInitialLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 2xl:grid-cols-5 2xl:gap-6">
          {Array.from({ length: 20 }, (_, index) => (
            <PersonCardSkeleton key={index} />
          ))}
        </div>
      ) : data?.results?.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 2xl:grid-cols-5 2xl:gap-6">
          {data.results.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <p className="body-text py-16 text-center">No people were found.</p>
      )}

      {data && (
        <div className="mt-6 md:mt-8">
          <Pagination
            page={page}
            totalPages={data.total_pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Section>
  );
};

export default Person;
