import { useState } from "react";
import DetailPanel from "../DetailPanel";
import SeasonAccordion from "./SeasonAccordion";

const SeasonsSection = ({ seriesId, seasons = [], fallbackImage, className = "" }) => {
  const orderedSeasons = [...seasons].sort((a, b) => a.season_number - b.season_number);
  const regularSeasons = orderedSeasons.filter((season) => season.season_number > 0);
  const specialSeasons = orderedSeasons.filter((season) => season.season_number === 0);
  const displaySeasons = regularSeasons.length
    ? [...regularSeasons, ...specialSeasons]
    : orderedSeasons;
  const [openSeasonNumber, setOpenSeasonNumber] = useState(
    displaySeasons[0]?.season_number ?? null,
  );

  return (
    <DetailPanel title="Seasons and Episodes" className={className}>
      {displaySeasons.length ? (
        <div className="flex flex-col gap-3">
          {displaySeasons.map((season) => (
            <SeasonAccordion
              key={`${seriesId}-${season.season_number}`}
              seriesId={seriesId}
              season={season}
              isOpen={openSeasonNumber === season.season_number}
              onToggle={() => setOpenSeasonNumber((open) => (
                open === season.season_number ? null : season.season_number
              ))}
              fallbackImage={fallbackImage}
            />
          ))}
        </div>
      ) : (
        <p className="body-text">Season information is not available.</p>
      )}
    </DetailPanel>
  );
};

export default SeasonsSection;
