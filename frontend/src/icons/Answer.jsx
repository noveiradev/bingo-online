import PropTypes from "prop-types";

export default function Answer({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "14"}
        height={h || "65"}
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H13M1 6H7M1 11H13"
          stroke={color || "white"}
          strokeOpacity="0.7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

Answer.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}