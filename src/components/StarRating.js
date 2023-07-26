import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starConatinerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetMovieRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  size = 48,
  color = "#fcc419",
  className = "",
  message = [],
  defaultRating = 0,
  onSetMovieRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempStarRating, setTempStarRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    color,
  };

  function handleRating(rate) {
    setRating(rate);

    if (onSetMovieRating) {
      onSetMovieRating(rate);
    }
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starConatinerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            fullStar={
              tempStarRating ? tempStarRating >= i + 1 : rating >= i + 1
            }
            onRating={() => handleRating(i + 1)}
            onMouseIn={() => setTempStarRating(i + 1)}
            onMouseOut={() => setTempStarRating(0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempStarRating ? tempStarRating - 1 : rating - 1]
          : tempStarRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRating, fullStar, onMouseIn, onMouseOut, size, color }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRating}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
    >
      {fullStar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
