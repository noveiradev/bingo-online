import PropTypes from "prop-types";

export default function Cancel({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "14"}
        height={h || "14"}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 13.0068L13 1.00684M1 1.00684L13 13.0068"
          stroke={color || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

Cancel.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
};
