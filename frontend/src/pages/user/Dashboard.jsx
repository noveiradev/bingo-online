import Logo from "@/assets/images/logo.png";

import Cardboards from "@/assets/images/tus_cartones.webp";
import ReservedCardboard from "@/assets/images/apartar_cartones.webp";
import PayInformation from "@/assets/images/pago_movil.webp";
import Patterns from "@/assets/images/modalidades.webp";
import Rules from "@/assets/images/rules.webp";
import Settings from "@/assets/images/Settings.webp";

import Exit from "@/icons/Exit";
import ModalMobilePay from "@/components/ModalMobilePay";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Dashboard() {
  const { logout } = useAuth();
  const [payData, setPayData] = useState(false);

  let option = [
    { img: Cardboards, text: "Tus cartones", path: "/cardboards" },
    {
      img: ReservedCardboard,
      text: "Apartar cartones",
      path: "/reserve-cardboard",
    },
    { img: PayInformation, text: "Pago móvil" },
    { img: Patterns, text: "Modalidades", path: "/patterns" },
    { img: Rules, text: "Reglas de juego", path: "/game-rules" },
    { img: Settings, text: "Configuración", path: "/settings" },
  ];

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        {payData && (
          <ModalMobilePay modalFunction={setPayData} payData={payData} />
        )}
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
          className="size-[12rem] desk:size-[7rem] desklg:size-[12rem] drop-shadow-[0_0_30px_rgba(83,63,27,0.50)]"
        />
        <h1 className="text-dark-gold font-semibold font-inter text-2xl">
          Menú
        </h1>
        <article className="grid grid-cols-2 gap-2 mt-2 px-2 stable:gap-x-3 stable:gap-y-4">
          {option.map((opt, i) => (
            <a
              key={i}
              href={opt.path}
              onClick={
                opt.path === undefined
                  ? () => {
                      setPayData(!payData);
                    }
                  : () => {}
              }
              className="flex flex-col h-[7rem] desk:h-[5.5rem] desklg:h-[7rem] justify-center items-center p-2 bg-white/10 w-[9rem] stable:w-[10.5rem] text-option border-2 border-dark-red rounded-[12px] shadow-[#DF8E1C]/20 shadow-md"
            >
              <img
                src={opt.img}
                alt={opt.text}
                className="size-12 stable:size-13 desk:size-10 desklg:size-12 drop-shadow-[0_0_10px_rgba(119,255,0,0.08)]"
              />
              <span className="text-md font-medium text-center">
                {opt.text}
              </span>
            </a>
          ))}
        </article>
      </section>
    </>
  );
}
