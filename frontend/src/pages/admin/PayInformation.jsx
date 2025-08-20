import GoBack from "@/components/GoBack";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PayCard from "@/components/PayCard";

import { payInformation } from "@/services/api/admin/payInformation";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function PayInformation() {
  const [payInfo, setPayInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message] = useState(
    <div className="mx-auto w-full h-[75%] flex flex-col justify-center items-center text-center text-[#FAF2E7] font-semibold font-poppins gap-4">
      <p className="w-[75%]">Por los momentos no existen métodos de pago registrados</p>
      <Link
        className="text-white bg-green-apple/60 py-1 rounded-lg font-inter text-lg w-[85%] text-center stable:w-[50%]"
        to={"/admin/create_pay_method"}
      >
        Crea uno ya!
      </Link>
    </div>
  );

  const getPayMethods = async () => {
    try {
      setIsLoading(true);
      const response = await payInformation.read();

      if (response) {
        setPayInfo(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Registration error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 650)
    }
  };

  useEffect(() => {
    getPayMethods();
  }, []);

  return (
    <>
      <section className="max-w-[768px] mx-auto h-full flex flex-col items-center justify-center pt-4">
        <div className="flex justify-between w-full max-w-[500px] px-2">
          <GoBack></GoBack>
          {payInfo.length > 0 && (
            <Link
              className="text-white bg-green-apple/60 py-1 px-3 rounded-lg font-inter flex items-center text-sm"
              to={"/admin/create_pay_method"}
            >
              Crear
            </Link>
          )}
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
          Pago móvil
        </h1>
        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-2 py-4 overflow-auto stable:overflow-hidden max-w-[500px]">
          <h2 className="text-center font-bold font-inter text-lg text-white">
            Bancos registrados para pago móvil
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Tailspin
                width={40}
                height={40}
                color="#DD8D1B"
                ariaLabel="Cargando..."
              />
            </div>
          ) : payInfo.length === 0 ? (
            message
          ) : (
            <section className="flex w-full flex-col gap-2 mt-4 items-center">
              {payInfo.map((pay) => (
                <PayCard
                  key={pay.id}
                  id={pay.id}
                  bank={pay.bank}
                  phone={pay.phone}
                  id_number={pay.id_number}
                  name={pay.name}
                  isActive={pay.is_active}
                />
              ))}
            </section>
          )}
        </article>
      </section>
    </>
  );
}
