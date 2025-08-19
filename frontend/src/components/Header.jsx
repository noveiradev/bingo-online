import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CasinoLights from "./CasinoLights";
import WhatsApp from "@/icons/WhatsApp";
import Button from "@/components/Button";
import Copy from "@/icons/Copy";
import { toast } from "@pheralb/toast";

export default function Header() {
  const [changeHeader, setChangeHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/admin/game/room")) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  }, [location.pathname]);

  const handleCopyLink = () => {
    const matchData = JSON.parse(localStorage.getItem("matchData")) ?? "";
    const url = `${window.location.origin}/game/room/${matchData.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.info({ text: "Link de la partida copiado correctamente!" });
      })
      .catch((err) => {
        console.error("Error al copiar el enlace:", err);
      });
  };

  return (
    <header className="relative bg-header flex flex-col stable:flex-row stable:py-6 gap-3 items-center justify-center p-2 py-4">
      {changeHeader ? (
        <div className="flex flex-col gap-1">
          <h1 className="text-md text-center">
            Comparte el enlace con los jugadores
          </h1>
          <Button
            text={"Copiar enlace"}
            className="py-1 px-2 bg-blue-gray/85 text-white font-inter text-sm rounded-full w-[60%] mx-auto mb-1 flex justify-center gap-2 items-center"
            onClick={handleCopyLink}
          >
            <Copy w={24} h={24} color={"#FFFFFF"}></Copy>
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-md text-center">
            Únete a nuestro grupo de WhatsApp
          </h1>
          <a
            className="py-1 px-4 shadow-[#000]/40 shadow-md bg-ws-button text-white rounded-full flex items-center justify-center gap-2 mb-1 stable:mb-0"
            href="https://chat.whatsapp.com/G5uW3TqBgGD2NXecXxRDPV?mode=r_t"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a WhatsApp <WhatsApp w="16" h="16"></WhatsApp>
          </a>
        </>
      )}

      <CasinoLights
        className={
          "absolute bottom-0 w-full h-[0.85rem] overflow-hidden bg-[#EFA418]"
        }
      ></CasinoLights>
    </header>
  );
}
