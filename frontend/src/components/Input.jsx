import PropTypes from "prop-types";

export default function Input({ type, name, id, placeholder, children }) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
        {children}
      </div>
      
      <input
        type={type}
        name={name}
        id={id}
        autoComplete="false"
        placeholder={placeholder}
        className="w-full bg-white/15 border-2 border-yellow-cake/28 rounded-[7px] py-2 pl-10 pr-3 text-white/70 placeholder:text-white/50 focus:outline-none focus:border-yellow-cake/70 transition-colors duration-200 font-inter text-sm"
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};