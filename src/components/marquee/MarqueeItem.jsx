import { getTmdbImageUrl } from "@/utils/tmdbImage";

const MarqueeItem = ({ movie, aspectRatio }) => {
  const imageURL =
    aspectRatio === "portrait" ? movie.poster_path : movie.backdrop_path;
  return (
    <rs-marquee-item
      className={`w-30 md:w-40 2xl:w-50 h-auto overflow-hidden rounded-md md:rounded-lg block ${aspectRatio === "portrait" ? "aspect-1/1.25" : "aspect-2/1"} `}
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
