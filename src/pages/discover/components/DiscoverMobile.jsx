import { useState } from "react";
import Section from "@/layout/Section";
import Button from "@/components/ui/button/Button";
import DiscoverMovies from "./DiscoverMovies";
import DiscoverShows from "./DiscoverShows";

const DiscoverMobile = () => {
  const [contentType, setContentType] = useState("movie");
  return (
    <Section>
      <div className="flex flex-col gap-y-12.5 w-full max-w-full">
        <div className="grid grid-cols-2 p-2 bg-dark-06 border border-dark-15 rounded-lg 2xl:rounded-base 2xl:p-2.5">
          <Button
            variant="toggle"
            active={contentType === "movie"}
            onClick={() => setContentType("movie")}
          >
            Movies
          </Button>
          <Button
            variant="toggle"
            active={contentType === "show"}
            onClick={() => setContentType("show")}
          >
            Shows
          </Button>
        </div>
        <div className="flex flex-col gap-y-12.5 w-full max-w-full">
          {contentType === "movie" ? <DiscoverMovies /> : <DiscoverShows />}
        </div>
      </div>
    </Section>
  );
};

export default DiscoverMobile;
