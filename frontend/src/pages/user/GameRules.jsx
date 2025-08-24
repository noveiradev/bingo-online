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

        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded p-4 overflow-hidden max-w-[500px]">
          <article className="overflow-y-auto h-full w-full px-4">
            <h2 className="text-[#FAF2E7] text-center font-poppins text-lg mb-6 font-semibold">
              Risas y Cartones - Normas
            </h2>
            <ol className="list-decimal text-gold-orange text-sm font-medium font-poppins flex flex-col gap-4">
              <li>
                <h3 className="underline">Partidas de BINGO</h3>
                <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                  <li>
                    Debe unirse a la partida seleccionando sus cartones para
                    poder ver los números que van saliendo durante la partida, ya que los números no se pasarán por el grupo.
                  </li>
                  <li>
                    Cada 15 números se dará una pausa de 2 minutos para revisar
                    los números que han salido.
                  </li>
                  <li>
                    Debe jugar todos sus cartones el mismo día.
                  </li>
                </ul>
              </li>

              <li>
                <h3 className="underline">Cantar BINGO</h3>
                <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                  <li>
                    El BINGO solo será válido si coincide con los números
                    cantados y el patrón de la partida.
                  </li>
                  <li>
                    Si tiene BINGO y no le dio tiempo de cantarlo porque otro
                    jugador lo canto, debe avisar por el grupo para que lo
                    verifiquen en los posibles ganadores.
                  </li>
                  <li>
                    Si canta BINGO por WhatsApp por fuera del sistema y no es
                    correcto, su carton queda descalificado.
                  </li>
                  <li>
                    Si esta jugando manualmente y tiene BINGO, debe cantarlo
                    seguido del número del cartón.
                  </li>
                </ul>
              </li>

              <li>
                <h3 className="underline">Múltiples ganadores</h3>
                <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                  <li>
                    Si al validar se confirma que dos jugadores tenían BINGO al
                    mismo tiempo, el premio se comparte.
                  </li>
                  <li>
                    Si hay BINGO y tenemos mas de 2 posibles ganadores, se
                    realizará un desempate con el mismo cartón al finalizar todas las partidas.
                  </li>
                </ul>
              </li>

              <li>
                <h3 className="underline">Obligaciones de los jugadores</h3>
                <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                  <li>Estar atentos a los números narrados por el sistema.</li>
                  <li>
                    Seleccionar sus cartones para jugar al entrar en la partida.
                  </li>
                  <li>
                    Marcar los números de sus cartones para poder cantar BINGO.
                  </li>
                  <li>
                    Si no tienes luz, notifícalo antes de comenzar; si no, tus
                    cartones pasarán a la siguiente ronda.
                  </li>
                </ul>
              </li>

              <li>
                <h3 className="underline">Validación del ganador</h3>
                <ul className="pl-4 list-disc text-[#FAF2E7] text-xs font-light">
                  <li>El sistema verificará automáticamente los números.</li>
                  <li>
                    Si es correcto, se declara ganador; si no, la partida
                    continúa.
                  </li>
                </ul>
              </li>
            </ol>
          </article>
        </article>
      </section>
    </>
  );
}
