import CardImage from "./CardImage";
import Card from "./Card";
import { formatDate } from "@/utils/format";

const NewReleaseCard = ({ content, mediaType }) => {
  return (
    <Card>
      <CardImage
        imagePath={content.poster_path}
        imageTitle={mediaType === "movie" ? content.title : content.name}
        to={mediaType === "movie" ? `/movie/${content.id}` : `/tv/${content.id}`}
      />
      <div className="w-full text-center p-1 2xl:p-2 bg-dark-06 border border-dark-15 rounded-full ">
        <div className="typo text-xs 2xl:text-sm text-neutral-60 leading-snug">
          {`Released at ${
            mediaType === "movie"
              ? formatDate(content.release_date)
              : formatDate(content.first_air_date)
          }`}
        </div>
      </div>
    </Card>
  );
};

export default NewReleaseCard;
