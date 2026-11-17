import { Icon } from "@iconify/react";

const RatingStars = ({ rating = 0, className = "" }) => {
  const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0));

  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating - fullStars >= 0.5;

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Icon icon="ep:star-filled" key={index} className="text-brand-45" />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <Icon icon="fluent:star-half-24-filled" className="text-brand-45" />
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Icon icon="ep:star-filled" key={index} className="text-transparent" />
      ))}
    </div>
  );
};
export default RatingStars;
