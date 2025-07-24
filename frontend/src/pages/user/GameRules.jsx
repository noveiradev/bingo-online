import GoBack from "@/components/GoBack";

export default function GameRules() {
  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center h-full overflow-hidden pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
          Reglas del juego
        </h1>

        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-hidden max-w-[500px]">
          <h2 className="text-[#FAF2E7] text-center font-poppins text-[14px] font-semibold">
            Risas y Cartones - Reglas
          </h2>
          <ol className="list-decimal text-gold-orange text-sm font-medium font-poppins flex flex-col gap-2">
            <li>
              <h3>Como jugar?</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>Cada jugador compra uno o más cartones.</li>
                <li>El cantor saca bolas al azar y anuncia los números.</li>
              </ul>
            </li>
            <li>
              <h3>Activación de BINGO</h3>
              <p className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                Al momento de activar el BINGO, debes asegurarte de haber
                completado el patrón establecido en la ronda que se esta
                jugando, de no ser asi, el cartón que estas jugando en esa
                ronda, será descalificado.
              </p>
            </li>
            <li>
              <h3>Tipos de Patrones (Ejemplos)</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li><strong>Figuras:</strong> Letras, esquinas, formas específicas.</li>
                <li><strong>Cartón Lleno:</strong> Todos los números del cartón.</li>
              </ul>
            </li>
            <li>
              <h3>Validación del ganador</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>El sistema verificará que los números marcados coincidan con los cantados.</li>
                <li>Si es correcto, se declara al ganador; si no, el juego continúa.</li>
                <li>En caso de múltiples ganadores, el premio puede repartirse.</li>
              </ul>
            </li>
          </ol>
        </article>
      </section>
    </>
  );
}
