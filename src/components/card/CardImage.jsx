import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { handleImageError } from "@/utils/onImageError";
import { cn } from "@/utils/clsx";
import { useLocation, Link } from "react-router";

const CardImage = ({ imagePath, imageTitle, className = "", to = "" }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={!to ? pathname : to}
      className={cn(
        `w-full h-auto aspect-3/3.5 bg-dark-06 rounded-base 2xl:rounded-xl overflow-hidden ${className}`,
      )}
    >
      <img
        src={getTmdbImageUrl(imagePath)}
        alt={imageTitle ?? "N/A"}
        className="cover-image"
        loading="eager"
        onError={handleImageError}
      />
    </Link>
  );
};

export default CardImage;
