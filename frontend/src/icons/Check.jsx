import PropTypes from "prop-types";

export default function Check({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "18"}
        height={h || "16"}
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 8.75464L7.5 14.7546L16.5 1.25464"
          stroke={color || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

Check.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
};
