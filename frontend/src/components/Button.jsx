import PropTypes from "prop-types";

export default function Button({text, onClick, className}) {
    
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
