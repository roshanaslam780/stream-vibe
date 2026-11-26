import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router";
import Section from "@/layout/Section";
import Pagination from "@/components/ui/Pagination";
import SearchMediaCard from "@/features/search/SearchMediaCard";
import { searchMovies } from "@/services/tmdb/movies";
import { searchTv } from "@/services/tmdb/tv";

const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query")?.trim() || "";
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [movies, setMovies] = useState(null);
  const [shows, setShows] = useState(null);
  const [movieError, setMovieError] = useState("");
  const [tvError, setTvError] = useState("");
  const [movieLoading, setMovieLoading] = useState(false);
  const [tvLoading, setTvLoading] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setMoviePage(1);
    setTvPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setMovies(null);
      setShows(null);
      setMovieLoading(false);
      setTvLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    let active = true;
    setMovieLoading(true);
    setTvLoading(true);
    setMovieError("");
    setTvError("");

    searchMovies(query, moviePage, controller.signal)
      .then((result) => { if (active) setMovies(result); })
      .catch((error) => { if (active && error.name !== "AbortError") setMovieError(error.message || "Could not load movie results."); })
      .finally(() => { if (active) setMovieLoading(false); });
    searchTv(query, tvPage, controller.signal)
      .then((result) => { if (active) setShows(result); })
      .catch((error) => { if (active && error.name !== "AbortError") setTvError(error.message || "Could not load TV results."); })
      .finally(() => { if (active) setTvLoading(false); });

    return () => { active = false; controller.abort(); };
  }, [query, moviePage, tvPage, retryKey]);

  return (
    <Section>
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-80">Search StreamVibe</p>
        <h1 className="typo text-2xl font-bold md:text-3xl">{query ? <>Results for “{query}”</> : "Search movies and TV shows"}</h1>
        {query && <p className="body-text mt-2">Browse movie and TV results separately. Choose a title to see its details.</p>}
      </div>

      {!query ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dark-15 bg-dark-10 px-5 text-center">
          <Icon icon="akar-icons:search" className="mb-3 size-8 text-neutral-60" />
          <p className="typo font-semibold">Enter a title to get started</p>
          <p className="body-text mt-1">Use the search icon in the header to find movies and shows.</p>
        </div>
      ) : (
        <div className="space-y-12 md:space-y-16">
          <ResultGroup
            title="Movies"
            mediaType="movie"
            result={movies}
            loading={movieLoading}
            error={movieError}
            page={moviePage}
            onPageChange={setMoviePage}
            emptyMessage="No movies matched this search."
            onRetry={() => setRetryKey((key) => key + 1)}
          />
          <ResultGroup
            title="TV Shows"
            mediaType="tv"
            result={shows}
            loading={tvLoading}
            error={tvError}
            page={tvPage}
            onPageChange={setTvPage}
            emptyMessage="No TV shows matched this search."
            onRetry={() => setRetryKey((key) => key + 1)}
          />
        </div>
      )}
    </Section>
  );
};

const ResultGroup = ({ title, mediaType, result, loading, error, page, onPageChange, emptyMessage, onRetry }) => (
  <section>
    <div className="mb-5 flex items-end justify-between gap-4">
      <div><h2 className="typo text-xl font-bold md:text-2xl">{title}</h2>{result && <p className="mt-1 text-sm text-neutral-60">{result.total_results.toLocaleString()} results</p>}</div>
      {loading && <span className="text-sm text-neutral-60">Loading…</span>}
    </div>
    {error ? (
      <div className="rounded-xl border border-dark-15 bg-dark-10 p-5">
        <p className="text-sm text-brand-80">{error}</p>
        <button type="button" onClick={onRetry} className="mt-2 text-xs font-semibold text-white underline underline-offset-4">Try again</button>
      </div>
    ) : loading && !result ? (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3, 4, 5, 6].map((item) => <ResultCardSkeleton key={item} />)}</div>
    ) : result?.results?.length ? (
      <>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{result.results.map((item) => <SearchMediaCard key={item.id} item={item} mediaType={mediaType} />)}</div>
        <div className="mt-7"><Pagination page={page} totalPages={result.total_pages} onPageChange={onPageChange} /></div>
      </>
    ) : (
      <p className="rounded-xl border border-dark-15 bg-dark-10 px-4 py-6 text-sm text-neutral-60">{emptyMessage}</p>
    )}
  </section>
);

const ResultCardSkeleton = () => <div className="flex animate-pulse gap-4 rounded-xl border border-dark-15 bg-dark-10 p-3 sm:p-4"><div className="aspect-[2/3] w-24 shrink-0 rounded-lg bg-dark-06 sm:w-32" /><div className="flex flex-1 flex-col gap-3 py-2"><div className="h-4 w-3/4 rounded bg-dark-06" /><div className="h-3 w-1/3 rounded bg-dark-06" /><div className="mt-2 space-y-2"><div className="h-3 w-full rounded bg-dark-06" /><div className="h-3 w-11/12 rounded bg-dark-06" /><div className="h-3 w-2/3 rounded bg-dark-06" /></div><div className="mt-auto h-3 w-12 rounded bg-dark-06" /></div></div>;

export default Search;
