import AvailableDevices from "@/features/devices/AvailableDevices";
import Hero from "./components/Hero";
import Faqs from "@/features/faqs/Faqs";
import PricingPlans from "@/features/pricing/PricingPlans";
import CallToAction from "@/features/callToAction/CallToAction";
import Categories from "./components/Categories";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <AvailableDevices />
      <Faqs />
      <PricingPlans />
      <CallToAction />
    </>
  );
};

export default Home;
