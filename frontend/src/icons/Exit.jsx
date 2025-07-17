import PropTypes from "prop-types";

export default function Exit({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "32"}
        height={h || "41"}
        viewBox="0 0 112 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42.0909 42V18.875C42.0909 11.2121 48.3182 5 56 5H93.0909C100.773 5 107 11.212 107 18.875V102.125C107 109.788 100.773 116 93.0909 116H56C48.3182 116 42.0909 109.788 42.0909 102.125V79M23.5455 79L5 60.5M5 60.5L23.5454 42M5 60.5L83.8182 60.5"
          stroke={color || "#FFF"}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

Exit.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
};
