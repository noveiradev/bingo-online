import PropTypes from "prop-types";
import { toast } from "@pheralb/toast";

export default function Input({
  type = "text",
  name,
  id,
  placeholder,
  children,
  register,
  error,
  onChange,
}) {
  if (error) {
    toast.error({
      text: error.message,
    });
  }

  return (
    <>
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
          {children}
        </div>

        <input
          type={type}
          id={id}
          autoComplete="off"
          placeholder={placeholder + (error ? ` *` : "")}
          onChange={onChange}
          className={`w-full bg-white/15 border-2 ${
            error ? "border-red-500" : "border-yellow-cake/28"
          } rounded-[7px] py-2 pl-10 pr-3 desk:py-[0.3rem] text-white/70 focus:outline-none focus:border-yellow-cake/70 transition-colors duration-200 font-inter text-sm ${
            error ? "placeholder-red-400" : "placeholder-white/50"
          } stable:text-[1rem] desk:text-[0.85rem] desklg:text-[1rem] desklg:py-2`}
          {...(register && register(name))}
        />
      </div>
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  register: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.object,
};
