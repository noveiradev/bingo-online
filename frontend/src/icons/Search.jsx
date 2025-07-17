import PropTypes from "prop-types";

export default function Search({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "15"}
        height={h || "15"}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 14L10.2468 10.2468M10.2468 10.2468C11.2271 9.2666 11.8333 7.91244 11.8333 6.41667C11.8333 3.42512 9.40821 1 6.41667 1C3.42512 1 1 3.42512 1 6.41667C1 9.40821 3.42512 11.8333 6.41667 11.8333C7.91244 11.8333 9.2666 11.2271 10.2468 10.2468Z"
          stroke={color || "white"}
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

Search.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}