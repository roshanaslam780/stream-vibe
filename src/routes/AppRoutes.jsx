import { Route, Routes } from "react-router";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home/Home";
import Discover from "@/pages/discover/Discover";
import MovieDetails from "@/pages/details/movie/MovieDetails";
import TvDetails from "@/pages/details/tv/TvDetails";
import NotFound from "@/pages/error/NotFound";
import Subscription from "@/pages/subscription/Subscription";
import Support from "@/pages/support/Support";
import TermsOfUse from "@/pages/utility/TermsOfUse";
import PrivacyPolicy from "@/pages/utility/PrivacyPolicy";
import CookiePolicy from "@/pages/utility/CookiePolicy";
import MoviesDiscover from "@/pages/movies/MoviesDiscover";
import TvDiscover from "@/pages/shows/TvDiscover";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/movie/:id" element={<MoviesDiscover />} />
        <Route path="/discover/tv/:id" element={<TvDiscover />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvDetails />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/support" element={<Support />} />

        {/* OTHER */}
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
