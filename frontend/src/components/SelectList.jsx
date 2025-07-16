import PropTypes from "prop-types";

export default function SelectList({ children }) {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
          {children}
        </div>
        <select
          name=""
          id=""
          className="w-full bg-white/15 border-2 border-yellow-cake/28 rounded-[7px] py-2 pl-10 text-white/70 focus:outline-none focus:border-yellow-cake/70 transition-colors duration-200 font-inter text-sm"
        >
          <option value="null" className="bg-[#000]/60">Pregunta de seguridad</option>
          <option value="1" className="bg-[#000]/60">Cual es tu color favorito?</option>
          <option value="2" className="bg-[#000]/60">Nombre de tu primer mascota</option>
          <option value="3" className="bg-[#000]/60">Año de nacimiento</option>
          <option value="4" className="bg-[#000]/60">Vehiculo favorito</option>
        </select>
      </div>
    </>
  );
}

SelectList.propTypes = {
  children: PropTypes.node,
};
