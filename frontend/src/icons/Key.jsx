import PropTypes from "prop-types";

export default function Key({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "18"}
        height={h || "18"}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0769 3.46154C13.4364 3.46154 14.5385 4.56361 14.5385 5.92308M17 5.92308C17 8.64202 14.7959 10.8462 12.0769 10.8462C11.7891 10.8462 11.5071 10.8215 11.2329 10.7741C10.7709 10.6943 10.2817 10.7953 9.95016 11.1268L7.76923 13.3077H5.92308V15.1538H4.07692V17H1V14.6878C1 14.1981 1.1945 13.7286 1.54073 13.3824L6.87323 8.04984C7.20473 7.71835 7.30574 7.22911 7.22592 6.76714C7.17854 6.49289 7.15385 6.21087 7.15385 5.92308C7.15385 3.20414 9.35798 1 12.0769 1C14.7959 1 17 3.20414 17 5.92308Z"
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

Key.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}