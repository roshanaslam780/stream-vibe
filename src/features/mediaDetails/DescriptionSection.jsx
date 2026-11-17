import DetailPanel from "./DetailPanel";

const DescriptionSection = ({ description, mediaType = "movie", className = "" }) => {
  const mediaLabel = mediaType === "tv" ? "show" : "movie";

  return (
    <DetailPanel title="Description" className={className}>
      <p className="body-text text-white/90">
        {description || `No description is available for this ${mediaLabel}.`}
      </p>
    </DetailPanel>
  );
};

export default DescriptionSection;
