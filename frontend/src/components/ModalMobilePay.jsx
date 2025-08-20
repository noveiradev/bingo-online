import BankCenter from "@/icons/BankCenter";
import { Slide } from "react-awesome-reveal";
import { payInformation } from "@/services/api/admin/payInformation";
import { useState, useEffect } from "react";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function ModalMobilePay({ modalFunction, payData }) {
  const [activePayment, setActivePayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentData = async () => {
      try {
        const response = await payInformation.activePayment();

        if (response) {
          setActivePayment(response.data);
          setIsLoading(false);
        } else {
          console.error("No se encontraron datos de pago móvil activos");
        }
      } catch (error) {
        console.error("Error al obtener los datos de pago:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    paymentData();
  }, []);

  return (
    <>
      <section className="bg-[#000]/70 absolute z-10 top-0 left-0 w-full h-dvh overflow-hidden">
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
                <BankCenter w="90" h="90" color="#FFFFFF" />
              </div>
              <div className="w-full bg-white/8 h-[8rem] rounded-xl outline-simple-gold/50 outline-3 p-3">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Tailspin
                      width={40}
                      height={40}
                      color="#DD8D1B"
                      ariaLabel="Cargando..."
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-white/75">
                      Nombres:{" "}
                      <span className="text-gold/85 font-semibold font-inter">
                        {activePayment?.name}
                      </span>
                    </p>
                    <p className="text-white/75">
                      Cédula:{" "}
                      <span className="text-gold/85 font-semibold font-inter">
                        {activePayment?.id_number}
                      </span>
                    </p>
                    <p className="text-white/75">
                      Teléfono:{" "}
                      <span className="text-gold/85 font-semibold font-inter">
                        {activePayment?.phone}
                      </span>
                    </p>
                    <p className="text-white/75">
                      Banco:{" "}
                      <span className="text-gold/85 font-semibold font-inter">
                        {activePayment?.bank}
                      </span>
                    </p>
                  </>
                )}
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
