import lights from "@/assets/images/casino_lights.png";

export default function Header() {
  return (
    <header className="relative bg-header flex flex-col gap-3 items-center justify-center p-2 py-4">
      <h1 className="text-md text-center">
        Únete a nuestro grupo de WhatsApp para que puedas jugar tus cartones!
      </h1>
      <a
        className="py-2 px-4 bg-ws-button text-white rounded-full"
        href="https://chat.whatsapp.com/G5uW3TqBgGD2NXecXxRDPV?mode=r_t"
        target="_blank"
        noreferrer
      >
        Ir a WhatsApp
      </a>
      <img src={lights} className="absolute bottom-0 left-0 w-full" alt="Casino Lights" />
    </header>
  );
}
