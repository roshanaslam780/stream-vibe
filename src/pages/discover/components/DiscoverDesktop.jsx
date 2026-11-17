import Fieldset from "@/components/ui/fieldset/Fieldset";
import Section from "@/layout/Section";
import DiscoverMovies from "./DiscoverMovies";
import DiscoverShows from "./DiscoverShows";

const DiscoverDesktop = () => {
  return (
    <>
      <Section>
        <Fieldset legend="Movies">
          <div className="flex flex-col gap-y-12.5 xl:gap-y-20 2xl:gap-y-25 w-full max-w-full pt-5">
            <DiscoverMovies />
          </div>
        </Fieldset>
      </Section>
      <Section>
        <Fieldset legend="Shows">
          <div className="flex flex-col gap-y-12.5 xl:gap-y-20 2xl:gap-y-25 w-full max-w-full pt-5">
            <DiscoverShows />
          </div>
        </Fieldset>
      </Section>
    </>
  );
};

export default DiscoverDesktop;
