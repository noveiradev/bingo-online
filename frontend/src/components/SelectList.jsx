import PropTypes from "prop-types";

export default function SelectList({ 
  children, 
  name, 
  id, 
  register, 
  error,
  options = [],
  defaultValue = "",
  validation, 
  className = ""
}) {
  const defaultOptions = [
    { value: "", label: `${error ? `Pregunta de seguridad *` : "Pregunta de seguridad"}` },
    { value: "1", label: "¿Cuál es tu color favorito?" },
    { value: "2", label: "Nombre de tu primer mascota" },
    { value: "3", label: "Año de nacimiento" },
    { value: "4", label: "Vehículo favorito" }
  ];

  const selectOptions = options.length > 0 ? options : defaultOptions;

  return (
    <div className={`relative w-full ${className}`}>
      {children && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
          {children}
        </div>
      )}

      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={`w-full bg-white/15 border-2 desk:text-[0.85rem] desk:py-[0.3rem] desklg:py-2 desklg:text-[1rem] ${
          error ? "border-red-500" : "border-yellow-cake/28"
        } rounded-[7px] py-2 ${
          children ? "pl-10" : "pl-3"
        } pr-3 focus:outline-none focus:border-yellow-cake/70 transition-colors duration-200 font-inter text-sm appearance-none ${error ? "text-red-400" : "text-white/70"}`}
        {...(register ? register(name, validation) : {})}
        aria-invalid={error ? "true" : "false"}
      >
        {selectOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={`bg-[#000]/60 ${error ? "text-red-200" : "text-white/70"}`}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

SelectList.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.func,
  error: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ),
  defaultValue: PropTypes.string,
  validation: PropTypes.object,
  className: PropTypes.string
};