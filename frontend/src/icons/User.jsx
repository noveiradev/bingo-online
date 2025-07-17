import PropTypes from "prop-types";

export default function User({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "17"}
        height={h || "17"}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4218 4.78125C11.2917 6.5367 9.9609 7.96875 8.49997 7.96875C7.03903 7.96875 5.70592 6.53703 5.57809 4.78125C5.44528 2.95508 6.7402 1.59375 8.49997 1.59375C10.2597 1.59375 11.5547 2.98828 11.4218 4.78125Z"
          stroke={color || "white"}
          strokeOpacity="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.49996 10.0938C5.61129 10.0938 2.67945 11.6875 2.13691 14.6957C2.0715 15.0583 2.2767 15.4062 2.65621 15.4062H14.3437C14.7236 15.4062 14.9288 15.0583 14.8633 14.6957C14.3205 11.6875 11.3886 10.0938 8.49996 10.0938Z"
          stroke={color || "white"}
          strokeOpacity="0.7"
          strokeMiterlimit="10"
        />
      </svg>
    </>
  );
}

User.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}