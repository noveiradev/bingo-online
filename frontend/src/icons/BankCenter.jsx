import PropTypes from "prop-types";

export default function BankCenter({ w, h, color }) {
  return (
    <>
      <svg
        width={w || "44"}
        height={h || "44"}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 42V23.6667M30.3333 42V23.6667M13.6667 42V23.6667M2 15.3333L22 2L42 15.3333M38.6667 42V18.2944C33.2362 17.4424 27.6698 17 22 17C16.3302 17 10.7638 17.4424 5.33333 18.2944V42M2 42H42M22 10.3333H22.0167V10.35H22V10.3333Z"
          stroke={color || "white"}
          strokeOpacity="0.3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

BankCenter.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
  color: PropTypes.string,
}