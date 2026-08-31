import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import "./StarRating.css";

// Two modes:
// - Display (default): shows `rating` (supports halves) and optionally the
//   review `count` next to it. Used on product cards and review lists.
// - Interactive (interactive=true): shows `value` and lets the person click
//   a star to pick a rating via `onRate`. Used in the "write a review" form.
const StarRating = ({
  rating = 0,
  count,
  size = 14,
  interactive = false,
  value = 0,
  onRate,
}) => {
  const displayRating = interactive ? value : rating;

  return (
    <div
      className={`star-rating${interactive ? " star-rating-interactive" : ""}`}
      role={interactive ? "radiogroup" : undefined}
      aria-label={interactive ? "Rating" : undefined}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = displayRating >= star;
        const half = !filled && displayRating >= star - 0.5;
        const Icon = filled ? FaStar : half ? FaStarHalfAlt : FaRegStar;

        return (
          <Icon
            key={star}
            size={size}
            className="star-rating-icon"
            onClick={interactive ? () => onRate(star) : undefined}
          />
        );
      })}

      {typeof count === "number" && (
        <span className="star-rating-count">
          {rating > 0 ? `${rating} (${count})` : `(${count})`}
        </span>
      )}
    </div>
  );
};

export default StarRating;
