import PropTypes from "prop-types";

export default function Button({ text, onClick, className, disabled = false, type, children }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled} type={type}>
      {text}
      {children}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};
