import { useState } from "react";
import { useApi } from "@/hooks/useAPI";
import { getTvByGenreId, getTvGenres } from "@/services/tmdb/tv";
import Pagination from "@/components/ui/Pagination";
import { useParams } from "react-router";
import TrendingCard from "@/components/card/TrendingCard";
import Section from "@/layout/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const TvDiscover = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useApi(getTvByGenreId, [id, page, {}]);
  const { data: genres, loading: genresLoading, error: genresError } = useApi(getTvGenres, [{}]);
  const genreName = genres?.find((genre) => String(genre.id) === id)?.name
    ?? (genresLoading || (!genres && !genresError) ? "Loading genre…" : "Genre unavailable");

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section>
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <Breadcrumbs items={[
          { label: "Home", to: "/" },
          { label: "Discover", to: "/discover" },
          { label: "TV Shows" },
          { label: genreName },
        ]} />
        <h1 className="typo text-2xl font-bold md:text-3xl">{genreName} Shows</h1>
      </div>

      {loading ? (
        <div className="w-full h-screen flex-center"><p className="body-text">Loading shows...</p></div>
      ) : error ? (
        <div className="w-full h-screen flex-center flex-col gap-3">
          <p className="body-text text-brand-45!">{error}</p>
          <button onClick={refetch} className="body-text underline">Try again</button>
        </div>
      ) : (
        <div className="mb-10 md:mb-12.5 lg:mb-15 2xl:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-8 lg:gap-10 2xl:gap-12.5">
            {data?.results?.map((show) => (
              <TrendingCard mediaType="tv" content={show} key={show.id} />
            ))}
          </div>
        </div>
      )}
      {!loading && data && <Pagination page={page} totalPages={data.total_pages} onPageChange={handlePageChange} />}
    </Section>
  );
};

export default TvDiscover
