import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router";
import { getMoviesGenres, getPopularMovies, searchMovies } from "@/services/tmdb/movies";
import { getPopularShows, getTvGenres, searchTv } from "@/services/tmdb/tv";
import SearchMediaCard from "@/features/search/SearchMediaCard";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState({ movies: [], tv: [] });
  const [popular, setPopular] = useState({ movies: [], tv: [] });
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");
  const [panelError, setPanelError] = useState("");
  const [panelLoading, setPanelLoading] = useState(false);
  const [panelRetry, setPanelRetry] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return undefined;
    const controller = new AbortController();
    let active = true;
    setPanelLoading(true);
    setPanelError("");
    inputRef.current?.focus();
    Promise.all([
      getMoviesGenres({}, controller.signal), getTvGenres({}, controller.signal),
      getPopularMovies(1, {}, controller.signal), getPopularShows(1, {}, controller.signal),
    ]).then(([movieGenres, tvGenres, movies, shows]) => {
      if (!active) return;
      setGenres({ movies: movieGenres, tv: tvGenres });
      setPopular({ movies: movies.slice(0, 8), tv: shows.slice(0, 8) });
    }).catch((error) => {
      if (active && error.name !== "AbortError") setPanelError(error.message || "Could not load search suggestions.");
    }).finally(() => { if (active) setPanelLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [isOpen, panelRetry]);

  useEffect(() => {
    const trimmed = query.trim();
    setSuggestions([]);
    setSuggestionError("");
    if (!isOpen || trimmed.length < 2) {
      setLoadingSuggestions(false);
      return undefined;
    }

    let active = true;
    const controller = new AbortController();
    setLoadingSuggestions(true);
    const timer = window.setTimeout(() => {
      Promise.all([searchMovies(trimmed, 1, controller.signal), searchTv(trimmed, 1, controller.signal)])
        .then(([movies, shows]) => {
          if (!active) return;
          setSuggestions([
            ...(movies.results || []).slice(0, 5).map((item) => ({ ...item, mediaType: "movie" })),
            ...(shows.results || []).slice(0, 5).map((item) => ({ ...item, mediaType: "tv" })),
          ].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 7));
        })
        .catch((error) => {
          if (active && error.name !== "AbortError") setSuggestionError(error.message || "Search suggestions are unavailable.");
        })
        .finally(() => { if (active) setLoadingSuggestions(false); });
    }, 350);

    return () => { active = false; window.clearTimeout(timer); controller.abort(); };
  }, [isOpen, query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onClose();
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className={`fixed inset-0 z-[110] transition-[opacity,visibility] duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!isOpen}>
      <button type="button" tabIndex={isOpen ? 0 : -1} aria-label="Close search" onClick={onClose} className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm" />
      <section className={`relative h-svh w-full overflow-y-auto border-b border-dark-20 bg-dark-08 shadow-2xl transition-transform duration-300 ease-(--transition-1) ${isOpen ? "translate-y-0" : "-translate-y-full"}`} aria-label="Site search">
        <div className="rs-container min-h-full py-5 sm:py-7 lg:py-9">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><p className="typo text-lg font-bold sm:text-xl">Find your next watch</p><p className="mt-1 text-xs text-neutral-60 sm:text-sm">Search movies and TV shows or explore by genre.</p></div>
            <button type="button" onClick={onClose} aria-label="Close search" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-dark-15 bg-dark-10 text-neutral-70 transition-colors hover:text-white"><Icon icon="lucide:x" className="size-5" /></button>
          </div>

          <form onSubmit={submitSearch} className="relative">
            <label htmlFor="site-search" className="sr-only">Search movies and TV shows</label>
            <div className="flex rounded-xl border border-dark-20 bg-dark-06 p-1.5 focus-within:border-brand-45">
              <Icon icon="akar-icons:search" className="mx-3 my-auto size-5 shrink-0 text-neutral-60" aria-hidden="true" />
              <input ref={inputRef} id="site-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search movies and TV shows..." autoComplete="off" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-neutral-60 sm:text-base" />
              {query && <button type="button" onClick={() => setQuery("")} className="px-3 text-xs text-neutral-60 hover:text-white">Clear</button>}
              <button type="submit" disabled={!query.trim()} className="rounded-lg bg-brand-50 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-45 disabled:cursor-not-allowed disabled:opacity-50">Search</button>
            </div>
            <button type="button" onClick={() => { onClose(); navigate("/advanced-search"); }} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-neutral-70 transition-colors hover:text-white"><Icon icon="lucide:sliders-horizontal" className="size-4" />Advanced search</button>

            {(loadingSuggestions || suggestions.length > 0 || suggestionError) && query.trim().length >= 2 && (
              <div className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-dark-20 bg-dark-10 shadow-2xl">
                {loadingSuggestions ? <p className="px-4 py-3 text-sm text-neutral-60">Searching…</p> : suggestionError ? <p className="px-4 py-3 text-sm text-brand-80">{suggestionError}</p> : suggestions.length ? suggestions.map((item) => (
                  <Link key={`${item.mediaType}-${item.id}`} to={`/${item.mediaType === "movie" ? "movie" : "tv"}/${item.id}`} onClick={onClose} className="flex items-center gap-3 border-b border-dark-15 px-4 py-2.5 last:border-0 hover:bg-dark-12">
                    <span className="size-10 shrink-0 overflow-hidden rounded-md bg-dark-06">{item.poster_path && <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt="" className="h-full w-full object-cover" />}</span>
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-white">{item.title || item.name}</span><span className="text-xs capitalize text-neutral-60">{item.mediaType === "movie" ? "Movie" : "TV Show"}{(item.release_date || item.first_air_date) ? ` · ${(item.release_date || item.first_air_date).slice(0, 4)}` : ""}</span></span>
                    <Icon icon="lucide:arrow-up-right" className="size-4 text-neutral-60" />
                  </Link>
                )) : <p className="px-4 py-3 text-sm text-neutral-60">No matches found. Press Search to see full results.</p>}
                {suggestions.length > 0 && <button type="submit" className="w-full bg-dark-06 px-4 py-3 text-left text-sm font-semibold text-brand-80 hover:bg-dark-12">See all results for “{query.trim()}”</button>}
              </div>
            )}
          </form>

          <div className="mt-7 grid gap-8">
            <section>
              <div className="mb-3 flex items-center justify-between"><h2 className="typo text-base font-semibold">Explore by genre</h2>{panelLoading && <span className="text-xs text-neutral-60">Loading…</span>}</div>
              {panelError ? <div><p className="text-sm text-brand-80">{panelError}</p><button type="button" onClick={() => setPanelRetry((retry) => retry + 1)} className="mt-2 text-xs font-semibold text-white underline underline-offset-4">Try again</button></div> : <div className="grid gap-4 sm:grid-cols-2">
                {[{ type: "movie", label: "Movies", items: genres.movies }, { type: "tv", label: "TV Shows", items: genres.tv }].map((group) => (
                  <div key={group.type}><h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-60">{group.label}</h3><div className="flex flex-wrap gap-2">{group.items.map((genre) => <Link key={genre.id} to={`/discover/${group.type}/${genre.id}`} onClick={onClose} className="rounded-full border border-dark-20 bg-dark-10 px-3 py-1.5 text-xs text-neutral-70 transition-colors hover:border-brand-45 hover:text-white">{genre.name}</Link>)}</div></div>
                ))}
              </div>}
            </section>
            <div className="grid max-w-5xl gap-6">
              <PopularRow title="Popular movies" items={popular.movies} mediaType="movie" loading={panelLoading} onClose={onClose} />
              <PopularRow title="Popular TV shows" items={popular.tv} mediaType="tv" loading={panelLoading} onClose={onClose} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PopularRow = ({ title, items, mediaType, loading, onClose }) => (
  <section className="min-w-0">
    <div className="mb-3 flex items-center justify-between"><h2 className="typo text-base font-semibold">{title}</h2><Link to={mediaType === "movie" ? "/discover" : "/discover"} onClick={onClose} className="text-xs text-neutral-60 hover:text-white">Discover</Link></div>
    {loading && !items.length ? <div className="flex gap-3">{[1, 2, 3].map((i) => <div key={i} className="aspect-[2/3] w-24 shrink-0 animate-pulse rounded-lg bg-dark-10" />)}</div> : items.length ? <div className="flex gap-3 overflow-x-auto pb-2">{items.slice(0, 6).map((item) => <SearchMediaCard key={item.id} item={item} mediaType={mediaType} compact />)}</div> : <p className="text-sm text-neutral-60">Popular titles are unavailable right now.</p>}
  </section>
);

export default SearchOverlay;
