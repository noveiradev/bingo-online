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

        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-x-hidden max-w-[500px]">
          <h2 className="text-[#FAF2E7] text-center font-poppins text-lg mb-6 font-semibold">
            Risas y Cartones - Normas
          </h2>
          <ol className="list-decimal text-gold-orange text-sm font-medium font-poppins flex flex-col gap-4">
            <li>
              <h3 className="underline">Durante la partida</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>
                  Cada 15 números se dará una pausa de 2 minutos para revisar
                  los números que han salido.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="underline">Cantar BINGO</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>
                  El BINGO solo será válido si coincide con los números cantados
                  y el patrón de la partida.
                </li>
                <li>
                  Si tiene BINGO y no le dio tiempo de cantarlo porque otro jugador lo canto, debe avisar por el grupo para que lo verifiquen.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="underline">Múltiples ganadores</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>
                  Si al validar se confirma que varios jugadores tenían BINGO al mismo tiempo, el premio se comparte.
                </li>
                <li>
                  Si hay BINGO y tenemos mas de 2 posibles ganadores, se realizará un desempate.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="underline">Obligaciones de los jugadores</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>
                  Estar atentos a los números narrados por el sistema.
                </li>
                <li>
                  Seleccionar sus cartones para jugar al entrar en la partida.
                </li>
                <li>
                  Marcar los números de sus cartones para poder cantar BINGO.
                </li>
                <li>
                  Si no tienes luz, notifícalo antes de comenzar; si no, tus cartones pasarán a la siguiente ronda.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="underline">Validación del ganador</h3>
              <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                <li>El sistema verificará automáticamente los números.</li>
                <li>
                  Si es correcto, se declara ganador; si no, la partida continúa.
                </li>
              </ul>
            </li>
          </ol>
        </article>
      </section>
    </>
  );
}
