import PropTypes from "prop-types";

export default function Button({ text, onClick, className, disabled = false }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
