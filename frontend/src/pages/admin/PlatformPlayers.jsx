import { useState, useEffect } from "react";
import { getPlayers } from "@/services/api/auth";

import GoBack from "@/components/GoBack";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function PlatformPlayers() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(
    <div className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
      <p>Por los momentos no existen jugadores registrados.</p>
    </div>
  );
  const [players, setPlayers] = useState([]);

  const getPlatformPlayers = async () => {
    setIsLoading(true);
    try {
      const response = await getPlayers.players();

      if (response) {
        setPlayers(response.data);
        if (response.length === 0) {
          setMessage(
            <div className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
              <p>No hay jugadores registrados actualmente.</p>
            </div>
          );
        } else {
          setMessage("");
        }
      }
    } catch (error) {
      console.error("Obtaining data error:", error);
      setMessage(
        <div className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
          <p>Error al cargar los jugadores. Intente nuevamente.</p>
        </div>
      );
      setTimeout(() => {
        setIsLoading(false);
      }, [1000]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, [500]);
    }
  };

  useEffect(() => {
    getPlatformPlayers();
  }, []);

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col h-full items-center justify-center pt-4">
        <div className="flex justify-between w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-4">
          Jugadores
        </h1>
        <article className="bg-white/5 w-[95%] h-full flex justify-center flex-wrap gap-2 rounded-lg border border-[#DD8D1B]/30 px-1 py-4 overflow-auto max-w-[500px] shadow-lg">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Tailspin
                width={40}
                height={40}
                color="#DD8D1B"
                ariaLabel="Cargando..."
              />
            </div>
          ) : players.length > 0 ? (
            <div className="w-full px-2 overflow-x-auto">
              <table className="min-w-full rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-[#DD8D1B]/35 to-[#DD8D1B]/15 text-[#FAF2E7] font-medium font-poppins">
                    <th className="py-3 px-2 text-left text-sm">Usuario</th>
                    <th className="py-3 px-2 text-left text-sm">Teléfono</th>
                    <th className="py-3 px-1 text-right text-sm">Victorias🏆</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p, i) => (
                    <tr 
                      key={i}
                      className={`${i % 2 === 0 ? 'bg-white/5' : 'bg-white/10'} hover:bg-[#DD8D1B]/20 transition-colors duration-200`}
                    >
                      <td className="py-2 px-2 text-[#FAF2E7] font-inter text-sm">
                        {p.username}
                      </td>
                      <td className="py-2 px-2 text-[#FAF2E7] font-inter text-sm">
                        {p.phone}
                      </td>
                      <td className={`py-2 px-2 text-right ${p.wins === 0 ? "text-red-400" : "text-green-apple/70"} font-inter font-semibold text-sm`}>
                        {p.wins}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            message
          )}
        </article>
      </section>
    </>
  );
}