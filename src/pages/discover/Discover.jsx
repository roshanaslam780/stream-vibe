import DiscoverHero from "@/features/discover/DiscoverHero";
import DiscoverPage from "./components/DiscoverPage";
import CallToAction from "@/features/callToAction/CallToAction";

const Discover = () => {
  return (
    <>
      <DiscoverHero mediaType="movie" />
      <DiscoverPage />
      <CallToAction /> 
    </>
  );
};

export default Discover;
