import BankCenter from "@/icons/BankCenter";
import { Slide } from "react-awesome-reveal";

export default function ModalMobilePay({ modalFunction, payData }) {
  return (
    <>
      <section className="bg-[#000]/70 absolute z-10 top-0 left-0 w-full h-dvh">
        <Slide
          direction="up"
          triggerOnce
          duration={600}
          className="w-full h-full absolute"
        >
          <article className="max-w-[350px] w-[95%] h-[25rem] bg-white/10 mx-auto mt-24 backdrop-blur-2xl rounded-2xl shadow-[#000]/50 shadow-lg outline-[#4E4E4B] outline-3 font-poppins">
            <div className="p-4 py-5 flex flex-col gap-4">
              <h1 className="text-center font-bold text-[1.6rem] text-[#FAF2E7]">
                Datos de pago móvil
              </h1>
              <div className="mx-auto pt-4">
                <BankCenter w="90" h="90" color="#FAF2E795" />
              </div>
              <div className="w-full bg-white/8 h-[8rem] rounded-xl outline-simple-gold/50 outline-3 p-3">
                <p className="text-white/75">
                  <span className="text-light-gold/95 font-medium">Nombres:</span> {/*Database info*/}
                </p>
                <p className="text-white/75">
                  <span className="text-light-gold/95 font-medium">Cédula:</span> {/*Database info*/}
                </p>
                <p className="text-white/75">
                  <span className="text-light-gold/95 font-medium">Teléfono:</span> {/*Database info*/}
                </p>
                <p className="text-white/75">
                  <span className="text-light-gold/95 font-medium">Banco:</span> {/*Database info*/}
                </p>
              </div>
            </div>
            <div className="px-4 flex flex-col">
              <span
                onClick={() => modalFunction(!payData)}
                className="bg-deep-blue text-center px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
              >
                Cerrar
              </span>
            </div>
          </article>
        </Slide>
      </section>
    </>
  );
}
