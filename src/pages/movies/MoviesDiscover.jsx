import { useState } from "react";
import { useApi } from "@/hooks/useAPI";
import { getMoviesByGenreId, getMoviesGenres } from "@/services/tmdb/movies";
import Pagination from "@/components/ui/Pagination";
import { useParams } from "react-router";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TrendingCard from "@/components/card/TrendingCard";
import Section from "@/layout/Section"

const MoviesDiscover = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useApi(getMoviesByGenreId, [id, page, {}]);
  const { data: genres, loading: genresLoading, error: genresError } = useApi(getMoviesGenres, [{}]);
  const genreName = genres?.find((genre) => String(genre.id) === id)?.name
    ?? (genresLoading || (!genres && !genresError) ? "Loading genre…" : "Genre unavailable");

  const handlePageChange = (newPage) => {
    setPage(newPage);

    // Optional: scroll back to the top of the movie section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Section>
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <Breadcrumbs items={[
          { label: "Home", to: "/" },
          { label: "Discover", to: "/discover" },
          { label: "Movies" },
          { label: genreName },
        ]} />
        <h1 className="typo text-2xl font-bold md:text-3xl">{genreName} Movies</h1>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="w-full h-screen flex-center">
          <p className="body-text">Loading Movies...</p>
        </div>
      ) : error ? (
        <div className="w-full h-screen flex-center">
          <div className="flex flex-col items-center gap-3">
            <p className="body-text text-brand-45!">{error}</p>
            <button onClick={refetch} className="body-text underline">Try again</button>
          </div>
        </div>
      ) : (
        <div className="mb-10 md:mb-12.5 lg:mb-15 2xl:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-8 lg:gap-10 2xl:gap-12.5">
            {data?.results?.map((movie) => {
              return (
                <TrendingCard
                  mediaType="movie"
                  content={movie}
                  key={movie.id}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && data && (
        <Pagination
          page={page}
          totalPages={data.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </Section>
  );
};

export default MoviesDiscover;
