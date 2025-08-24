import Logo from "@/assets/images/logo.png";
import Cardboards from "@/assets/images/tus_cartones.webp";
import PayInformation from "@/assets/images/pago_movil.webp";
import Patterns from "@/assets/images/modalidades.webp";
import Live from "@/assets/images/live.webp";
import Players from "@/assets/images/jugadores.webp";
import Settings from "@/assets/images/Settings.webp";
import EmptyCardboard from "@/assets/images/Carton-vacio.webp";

import { useState } from "react";
import Search from "@/icons/Search";
import Exit from "@/icons/Exit";
import { cardById } from "@/services/api/cards";
import { useAuth } from "@/hooks/useAuth";
import LinkOption from "@/components/LinkOption";
import Input from "@/components/Input";
import { toast } from "@pheralb/toast";

export default function Dashboard() {
  const { logout } = useAuth();

  let option = [
    {
      img: Cardboards,
      text: "Validar cartones",
      path: "/admin/verify-cardboards",
    },
    { img: PayInformation, text: "Pago móvil", path: "/admin/pay-information" },
    {
      img: Patterns,
      text: "Gestionar modalidades",
      path: "/admin/game-patterns",
    },
    {
      img: Live,
      text: "Iniciar partida en directo",
      path: "/admin/game/room",
    },
    { img: Players, text: "Jugadores", path: "/admin/platform_players" },
    { img: Settings, text: "Configuración", path: "/admin/settings" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setCard(null);

    try {
      const response = await cardById.cardById(searchTerm);
      if (response.success) {
        setCard(response.data);
      } else {
        toast.error({
          text: "No encontrado",
          description: `No existe cartón con número ${searchTerm}`,
        });
      }
    } catch (err) {
      toast.error({
        text: "Error",
        description: err.message || "No se pudo buscar el cartón",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="max-w-[768px] mx-auto h-full flex flex-col items-center py-4 overflow-auto relative">
        <article className="w-full max-w-[500px] relative">
          <span
            onClick={logout}
            className="absolute top-2 right-4 flex items-center text-green-apple font-poppins gap-1"
          >
            <Exit w="20" h="30" color="#8ACE56" />
            Salir
          </span>
        </article>

        <img
          src={Logo}
          alt="Bingo Online Logo"
          className="size-[8rem] desk:size-[7rem] desklg:size-[12rem] drop-shadow-[0_0_30px_rgba(83,63,27,0.50)]"
        />
        <h1 className="text-dark-gold font-semibold font-inter text-2xl">
          Menú
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mt-2">
          <Input
            placeholder="Buscar cartón por número"
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <Search />
          </Input>
          <button
            type="submit"
            className="bg-dark-gold/40 px-3 rounded-md text-white font-semibold hover:bg-gold/40 cursor-pointer"
          >
            Buscar
          </button>
        </form>

        {card && (
          <article className="absolute w-full h-[100%] bg-black/30 flex justify-center items-center z-30 top-0 backdrop-blur-sm">
            <div className="relative z-40 h-fit flex flex-col justify-center items-center p-4 pt-5 bg-carbon-gray rounded-xl">
              <span
                className="text-white/50 cursor-pointer w-full text-right absolute top-1 right-2 text-sm"
                onClick={() => {
                  setCard("");
                }}
              >
                ✕
              </span>
              <h2 className="text-dark-gold font-bold">Carton #{card.id}</h2>
              <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem] items-center justify-items-center self-center">
                {JSON.parse(card.numbers).map((number, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center text-xs font-bold z-10 text-black"
                  >
                    {number === "free" ? (
                      <span className="text-[8px]"></span>
                    ) : (
                      number
                    )}
                  </div>
                ))}
                <img
                  src={EmptyCardboard}
                  alt="Bingo cardboard"
                  className="w-30 h-auto absolute"
                />
              </div>
            </div>
          </article>
        )}

        <article className="grid grid-cols-2 gap-2 mt-2 px-1">
          {option.map((opt, i) => (
            <LinkOption key={i} index={i} opt={opt} />
          ))}
        </article>
      </section>
    </>
  );
}
