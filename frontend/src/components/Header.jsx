import CasinoLights from "./CasinoLights";
import WhatsApp from '@/icons/WhatsApp';

export default function Header() {
  return (
    <header className="relative bg-header flex flex-col gap-3 items-center justify-center p-2 py-4">
      <h1 className="text-md text-center">
        Únete a nuestro grupo de WhatsApp para que puedas jugar tus cartones!
      </h1>
      <a
        className="py-2 px-4 bg-ws-button text-white rounded-full flex items-center gap-2"
        href="https://chat.whatsapp.com/G5uW3TqBgGD2NXecXxRDPV?mode=r_t"
        target="_blank"
        noreferrer="true"
      >
        Ir a WhatsApp <WhatsApp w="16" h="16"></WhatsApp>
      </a>
      <CasinoLights location={"bottom"}></CasinoLights>
    </header>
  );
}
