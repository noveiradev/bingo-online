import GoBack from "@/components/GoBack";
import BingoRoller from "@/assets/images/bingo.webp";
import Arrow from "@/icons/Arrow";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Unauthorized() {
  const { user } = useAuth();
  
  // Calcular el link basado en el rol
  const link = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <Link
            className={`flex self-start items-center gap-1 cursor-pointer text-dark-gold font-semibold text-sm hover:text-light-gold transition-colors duration-200 bg-dark-red/60 py-2 px-3 rounded-full`}
            to={link}
          >
            <span className="rotate-90">
              <Arrow w={"14"} h={"9"} color={"#FFC72C"} />
            </span>
            <span className="text-[#FFC72C] underline">Volver</span>
          </Link>
        </div>
        <article className="flex flex-col gap-2 justify-center items-center p-4 py-8">
          <h2 className="text-dark-gold mt-4 text-center font-semibold max-w-[300px] font-poppins text-2xl">
            No tienes permisos para entrar a esta ruta
          </h2>
          <img
            src={BingoRoller}
            alt="Bingo roller"
            className="size-[18rem] drop-shadow-[0_0_5px_rgba(83,63,27,0.80)]"
          />
          <p className="text-[#FAF2E7] max-w-[300px] text-center font-poppins">
            Por favor, utiliza el boton de Volver para dirigirte a la pagina
            anterior.
          </p>
        </article>
      </section>
    </>
  );
}