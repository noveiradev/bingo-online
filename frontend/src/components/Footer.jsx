import CasinoLights from "./CasinoLights";

export default function Footer() {
  return (
    <footer className="relative z-20 bottom-0 flex flex-col justify-center items-center w-full h-[5rem] bg-borgon text-center text-white/85 p-2">
      <p className="text-[0.85rem] stable:text-[0.95rem]">
        Pagina desarrollada por <b>noveiradev</b> y <b>REFH4CK</b>
      </p>
      <p className="text-[0.9rem]">Todos los derechos reservados © 2025</p>
      <CasinoLights
        className={
          "absolute top-0 w-full h-[0.85rem] overflow-hidden bg-[#EFA418]"
        }
      ></CasinoLights>
    </footer>
  );
}
