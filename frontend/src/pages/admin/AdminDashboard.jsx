import Logo from "@/assets/images/logo.png";
import Cardboards from "@/assets/images/tus_cartones.webp";
import PayInformation from "@/assets/images/pago_movil.webp";
import Patterns from "@/assets/images/modalidades.webp";
import Live from "@/assets/images/live.webp";
import Players from "@/assets/images/jugadores.webp";
import Settings from "@/assets/images/Settings.webp";

import Exit from "@/icons/Exit";
import { useAuth } from "@/hooks/useAuth";
import LinkOption from "@/components/LinkOption";

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

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        <article className="w-full max-w-[500px] relative">
          <span
            onClick={logout}
            className="absolute top-2 right-4 flex items-center text-green-apple font-poppins gap-1"
          >
            <Exit w="20" h="30" color="#8ACE56"></Exit>
            Salir
          </span>
        </article>
        <img
          src={Logo}
          alt="Bingo Online Logo"
          className="size-[12rem] drop-shadow-[0_0_30px_rgba(83,63,27,0.50)]"
        />
        <h1 className="text-dark-gold font-semibold font-inter text-2xl">
          Menú
        </h1>
        <article className="grid grid-cols-2 gap-2 stable:gap-x-3 stable:gap-y-4 mt-2 px-2">
          {option.map((opt, i) => (
            <LinkOption index={i} opt={opt} />
          ))}
        </article>
      </section>
    </>
  );
}
