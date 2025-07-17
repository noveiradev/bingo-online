import PropTypes from "prop-types";

export default function Arrow({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "12"}
        height={h || "7"}
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 0.999999L6 6L1 1"
          stroke={color || "white"}
          stroke-opacity="1"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}

Arrow.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}