import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import Section from "@/layout/Section";
import SearchMediaCard from "@/features/search/SearchMediaCard";
import { getMoviesGenres } from "@/services/tmdb/movies";
import { getTvGenres } from "@/services/tmdb/tv";
import { TMDBFetch } from "@/services/tmdb/api";

const initialFilters = { type: "movie", query: "", genre: "", year: "", language: "", rating: "", runtime: "", sort: "popularity.desc", imdbId: "" };

const AdvancedSearch = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [genres, setGenres] = useState([]);
  const [genreError, setGenreError] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const getGenres = filters.type === "movie" ? getMoviesGenres : getTvGenres;
    getGenres({}, controller.signal).then(setGenres).catch((err) => {
      if (err.name !== "AbortError") setGenreError(err.message || "Unable to load genres.");
    });
    return () => controller.abort();
  }, [filters.type]);

  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const submit = async (event, requestedPage = 1) => {
    event?.preventDefault();
    setPage(requestedPage);
    setSearched(true);
    setLoading(true);
    setError("");
    try {
      let items;
      if (filters.imdbId.trim()) {
        const imdbId = filters.imdbId.trim();
        const found = await TMDBFetch(`/find/${encodeURIComponent(imdbId)}`, { external_source: "imdb_id" });
        items = filters.type === "movie" ? found.movie_results : found.tv_results;
      } else {
        if (!filters.query.trim() && !filters.genre && !filters.year && !filters.language && !filters.rating && !filters.runtime) {
          const popularPath = filters.type === "movie" ? "/movie/popular" : "/tv/popular";
          const popular = await TMDBFetch(popularPath, { language: "en-US", page: requestedPage });
          items = popular.results;
          setResults(items || []);
          return;
        }
        const params = { language: "en-US", page: requestedPage, sort_by: filters.sort, include_adult: false };
        if (filters.query.trim()) params.with_keywords = filters.query.trim();
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params[filters.type === "movie" ? "primary_release_year" : "first_air_date_year"] = filters.year;
        if (filters.language) params.with_original_language = filters.language;
        if (filters.rating) params["vote_average.gte"] = filters.rating;
        if (filters.runtime && filters.type === "movie") params["with_runtime.gte"] = filters.runtime;
        const data = await TMDBFetch(`/discover/${filters.type}`, params);
        items = data.results;
      }
      setResults(items || []);
    } catch (err) {
      setError(err.message || "Search failed. Check the filters and try again.");
      setResults([]);
    } finally { setLoading(false); }
  };

  const reset = () => { setFilters(initialFilters); setResults([]); setError(""); setSearched(false); setPage(1); };
  const fieldClass = "mt-2 min-h-11 w-full rounded-lg border border-dark-20 bg-dark-06 px-3 text-sm text-white outline-none focus:border-brand-45";

  return (
    <Section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-80">Search StreamVibe</p><h1 className="typo text-2xl font-bold md:text-3xl">Advanced search</h1><p className="body-text mt-2">Discover popular titles or narrow results with detailed filters.</p></div>
        <button type="button" onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-neutral-70 hover:text-white"><Icon icon="lucide:arrow-left" />Back</button>
      </div>

      <form onSubmit={(event) => submit(event)} className="rounded-xl border border-dark-15 bg-dark-10 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-sm font-semibold text-neutral-70">Media type<select className={fieldClass} value={filters.type} onChange={(event) => update("type", event.target.value)}><option value="movie">Movies</option><option value="tv">TV shows</option></select></label>
          <label className="text-sm font-semibold text-neutral-70">Title or keywords<input className={fieldClass} value={filters.query} onChange={(event) => update("query", event.target.value)} placeholder="e.g. space adventure" /></label>
          <label className="text-sm font-semibold text-neutral-70">Genre<select className={fieldClass} value={filters.genre} onChange={(event) => update("genre", event.target.value)}><option value="">Any genre</option>{genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}</select>{genreError && <span className="mt-1 block text-xs text-brand-80">{genreError}</span>}</label>
          <label className="text-sm font-semibold text-neutral-70">Release year<input className={fieldClass} type="number" min="1900" max="2099" value={filters.year} onChange={(event) => update("year", event.target.value)} placeholder="Any year" /></label>
          <label className="text-sm font-semibold text-neutral-70">Original language<input className={fieldClass} value={filters.language} onChange={(event) => update("language", event.target.value.toLowerCase().slice(0, 2))} placeholder="en" maxLength={2} /></label>
          <label className="text-sm font-semibold text-neutral-70">Minimum rating<input className={fieldClass} type="number" min="0" max="10" step="0.5" value={filters.rating} onChange={(event) => update("rating", event.target.value)} placeholder="Any rating" /></label>
          {filters.type === "movie" && <label className="text-sm font-semibold text-neutral-70">Minimum runtime (minutes)<input className={fieldClass} type="number" min="1" value={filters.runtime} onChange={(event) => update("runtime", event.target.value)} placeholder="Any runtime" /></label>}
          <label className="text-sm font-semibold text-neutral-70">Sort results<select className={fieldClass} value={filters.sort} onChange={(event) => update("sort", event.target.value)}><option value="popularity.desc">Popularity, high to low</option><option value="vote_average.desc">Rating, high to low</option><option value={filters.type === "movie" ? "primary_release_date.desc" : "first_air_date.desc"}>Newest first</option><option value="revenue.desc">Revenue, high to low</option><option value="original_title.asc">Title, A to Z</option></select></label>
          <label className="text-sm font-semibold text-neutral-70">IMDb ID lookup<input className={fieldClass} value={filters.imdbId} onChange={(event) => update("imdbId", event.target.value)} placeholder="tt0133093" /></label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3"><button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-50 px-5 text-sm font-semibold text-white hover:bg-brand-45"><Icon icon="akar-icons:search" />Search titles</button><button type="button" onClick={reset} className="min-h-11 rounded-lg border border-dark-20 px-5 text-sm font-semibold text-neutral-70 hover:text-white">Reset filters</button></div>
      </form>

      {searched && <section className="mt-10"><div className="mb-5 flex items-center justify-between"><h2 className="typo text-xl font-bold">{filters.type === "movie" ? "Movie results" : "TV results"}</h2>{!loading && <span className="text-sm text-neutral-60">{results.length} shown · page {page}</span>}</div>{loading ? <p className="body-text py-8">Loading results…</p> : error ? <div className="rounded-xl border border-dark-15 bg-dark-10 p-5"><p className="text-sm text-brand-80">{error}</p><button type="button" onClick={() => submit(null, page)} className="mt-2 text-sm font-semibold underline">Try again</button></div> : results.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{results.map((item) => <SearchMediaCard key={item.id} item={item} mediaType={filters.type} />)}</div> : <p className="body-text py-8">No titles matched those filters.</p>}{!filters.imdbId && <div className="mt-6 flex justify-center gap-3"><button type="button" disabled={page <= 1 || loading} onClick={() => submit(null, page - 1)} className="rounded-lg border border-dark-20 px-4 py-2 text-sm disabled:opacity-40">Previous</button><button type="button" disabled={results.length < 20 || loading} onClick={() => submit(null, page + 1)} className="rounded-lg border border-dark-20 px-4 py-2 text-sm disabled:opacity-40">Next</button></div>}</section>}
    </Section>
  );
};

export default AdvancedSearch;
