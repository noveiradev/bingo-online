import { useEffect, useState } from "react";
import { toast } from "@pheralb/toast";
import { playerMatch } from "@/services/api/admin/liveMatch";

export default function PlayersInMatch({ view, setView }) {
  const [players, setPlayers] = useState([]);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("matchData");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.id) {
          setGameId(parsed.id);
        } else {
          toast.error({ text: "Partida no encontrada.", description: "Crea una partida para poder ver a los jugadores." });
        }
      } catch (err) {
        console.error("Error al parsear matchData:", err);
        toast.error({ text: "Error en los datos locales de la partida." });
      }
    } else {
      toast.error({ text: "No tienes una partida iniciada.", description: "Crea una partida para poder ver a los jugadores."  });
    }
  }, []);

  useEffect(() => {
    const getMatchPlayers = async () => {
      try {
        const response = await playerMatch.getPlayers(gameId);

        if (response.success) {
          setPlayers(response.users);
        } else {
          toast.error({ text: "No hay jugadores en esta partida" });
        }
      } catch (error) {
        console.error("Response error: ", error);
        toast.error({ text: "Error al obtener jugadores" });
      }
    };

    if (gameId) {
      getMatchPlayers();
    }
  }, [gameId]);

  return (
    <section className="absolute z-40 max-w-[350px] w-[90%] h-[28rem] bg-white/10 backdrop-blur-2xl rounded-2xl shadow-[#000]/50 shadow-lg outline-[#9b9b9bd7] outline-3 font-poppins text-white p-4 overflow-y-auto">
      <div className="flex flex-col gap-2 items-center mb-4">
        <button
          onClick={() => setView(!view)}
          className="self-end text-lg text-white hover:text-red-600 transition"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold">Jugadores en esta partida</h2>
      </div>

      {players.length > 0 ? (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/30 text-left">
              <th className="py-2 border-r border-white/30">#</th>
              <th className="py-2 pl-2">Nombre</th>
              <th className="py-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id || index} className="border-b border-white/10">
                <td className="py-2 border-r border-white/10">{index + 1}</td>
                <td className="py-2 pl-2">{player.username}</td>
                <td className="py-2">{player.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-28 bg-black/25 p-4 rounded-md text-white/80">
          No hay jugadores en esta partida
        </p>
      )}
    </section>
  );
}
