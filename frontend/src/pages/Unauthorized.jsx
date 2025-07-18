import GoBack from "@/components/GoBack";
import BingoRoller from "@/assets/images/bingo.webp";

export default function Unauthorized() {
  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <article className="flex flex-col gap-2 justify-center items-center p-4 py-8">
          <h2 className="text-dark-gold mt-4 text-center font-semibold font-poppins text-2xl">
            No tienes permisos para entrar a esta ruta
          </h2>
          <img src={BingoRoller} alt="Bingo roller" className="size-[18rem] drop-shadow-[0_0_5px_rgba(83,63,27,0.80)]" />
          <p className="text-[#FAF2E7] text-center font-poppins">
            Por favor, utiliza el boton de Volver para dirigirte a la pagina anterior.
          </p>
        </article>
      </section>
    </>
  );
}
