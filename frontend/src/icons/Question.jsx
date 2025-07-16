import PropTypes from "prop-types";

export default function Question({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "9"}
        height={h || "17"}
        viewBox="0 0 9 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 2.0689C2.6288 0.6437 5.2696 0.6437 6.8984 2.0689C8.5272 3.4941 8.5272 5.8048 6.8984 7.23C6.61491 7.47805 6.30076 7.68294 5.96662 7.84464C4.92991 8.34637 3.9492 9.23256 3.9492 10.3843V11.427M3.94888 15.5978H3.95931V15.6082H3.94888V15.5978Z"
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

Question.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}