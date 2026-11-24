import { getTmdbImageUrl } from "@/utils/tmdbImage";

const cardWidthBySize = {
  xs: "w-20 md:w-24 2xl:w-28",
  sm: "w-24 md:w-30 2xl:w-36",
  md: "w-30 md:w-40 2xl:w-50",
  lg: "w-36 md:w-48 2xl:w-60",
};

const MarqueeItem = ({ movie, aspectRatio, size = "md" }) => {
  const imageURL =
    aspectRatio === "portrait" ? movie.poster_path : movie.backdrop_path;
  const cardWidth = cardWidthBySize[size] || cardWidthBySize.md;
  return (
    <rs-marquee-item
      className={`${cardWidth} h-auto overflow-hidden rounded-md md:rounded-lg block ${aspectRatio === "portrait" ? "aspect-1/1.25" : "aspect-2/1"} `}
    >
      <img
        src={
          movie.poster_path
            ? getTmdbImageUrl(imageURL)
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="cover-image"
      />
    </rs-marquee-item>
  );
};

export default MarqueeItem;
