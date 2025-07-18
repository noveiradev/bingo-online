import CasinoLights from "./CasinoLights";
import WhatsApp from "@/icons/WhatsApp";

export default function Header() {
  return (
    <header className="relative bg-header flex flex-col stable:flex-row stable:py-6 gap-3 items-center justify-center p-2 py-4">
      <h1 className="text-md text-center">
        Únete a nuestro grupo de WhatsApp
      </h1>
      <a
        className="py-1 px-4 shadow-[#000]/40 shadow-md bg-ws-button text-white rounded-full flex items-center justify-center gap-2"
        href="https://chat.whatsapp.com/G5uW3TqBgGD2NXecXxRDPV?mode=r_t"
        target="_blank"
        noreferrer="true"
      >
        Ir a WhatsApp <WhatsApp w="16" h="16"></WhatsApp>
      </a>
      <CasinoLights
        className={
          "absolute bottom-0 w-full h-[0.85rem] overflow-hidden bg-[#EFA418]"
        }
      ></CasinoLights>
    </header>
  );
}
