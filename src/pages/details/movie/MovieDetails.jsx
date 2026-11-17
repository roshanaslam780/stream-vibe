import { useParams } from "react-router";
import { useApi } from "@/hooks/useAPI";
import { getMovieDetailsById } from "@/services/tmdb/movies";
import ApiState from "@/components/common/ApiState";
import Section from "@/layout/Section";
import CallToAction from "@/features/callToAction/CallToAction";
import DiscoverSlide from "@/features/discover/DiscoverSlide";
import DescriptionSection from "@/features/mediaDetails/DescriptionSection";
import CastSection from "@/features/mediaDetails/CastSection";
import ReviewsSection from "@/features/mediaDetails/ReviewsSection";
import MediaDetailsSidebar from "@/features/mediaDetails/MediaDetailsSidebar";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useApi(getMovieDetailsById, [id]);
  const currentData = data?.id === Number(id) ? data : null;
  const movie = currentData ?? {};

  return (
    <>
      <Section className="pt-5 md:pt-8 lg:pt-10">
        <ApiState
          loading={loading || (!currentData && !error)}
          error={error}
          data={currentData}
          onRetry={refetch}
          emptyComponent={
            <div className="min-h-80 flex-center flex-col gap-3 text-center">
              <h1 className="typo text-2xl font-bold">Movie not found</h1>
              <p className="body-text">We could not find a movie with that ID.</p>
            </div>
          }
        >
          <article className="flex min-w-0 flex-col gap-8 md:gap-10 2xl:gap-12.5">
            <div className="swiper-container rounded-xl" aria-label="Movie hero">
              <DiscoverSlide type="static" mediaType="movie" content={movie} contentSlice={1} />
            </div>

            <div className="grid min-w-0 items-start gap-5 md:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] 2xl:gap-7.5">
              <DescriptionSection description={movie.overview} mediaType="movie" className="xl:col-start-1 xl:row-start-1" />
              <MediaDetailsSidebar media={movie} mediaType="movie" className="xl:col-start-2 xl:row-start-1 xl:row-span-3 xl:self-start" />
              <CastSection cast={movie.credits?.cast ?? []} mediaType="movie" className="xl:col-start-1 xl:row-start-2" />
              <ReviewsSection reviews={movie.reviews?.results ?? []} mediaType="movie" className="xl:col-start-1 xl:row-start-3" />
            </div>
          </article>
        </ApiState>
      </Section>
      <CallToAction />
    </>
  );
};

export default MovieDetails;
