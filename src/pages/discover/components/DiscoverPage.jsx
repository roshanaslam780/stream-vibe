import useMediaQuery from "@/hooks/useMediaQuery";
import DiscoverMobile from "./DiscoverMobile";
import DiscoverDesktop from "./DiscoverDesktop";

const DiscoverPage = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) {
    return <DiscoverMobile />;
  }
  return <DiscoverDesktop />;
};
export default DiscoverPage;
