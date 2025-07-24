import { useState, useEffect } from "react";
import { obtainAllPatterns } from "@/services/api/patterns";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Fade } from "react-awesome-reveal";

import GoBack from "@/components/GoBack";
import EmptyCardBoard from "@/assets/images/Carton-vacio.webp";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function GamePatterns() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(
    <div className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
      <p>Por los momentos no existen modalidades, crea una ya!</p>
    </div>
  );
  const [patterns, setPatterns] = useState([]);

  const getPatterns = async () => {
    setIsLoading(true);
    try {
      const response = await obtainAllPatterns.get();

      if (response) {
        setPatterns(response);
        setMessage("");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, [1000]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, [500]);
    }
  };

  useEffect(() => {
    getPatterns();
  }, []);

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col h-full items-center justify-center pt-4">
        <div className="flex justify-between w-full max-w-[500px] px-2">
          <GoBack></GoBack>
          {user.role === "admin" ? (
            <Link
              className="text-white bg-green-apple/60 py-1 px-3 rounded-lg font-inter flex items-center text-sm"
              to={"/admin/create-pattern"}
            >
              Crear
            </Link>
          ) : (
            ""
          )}
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
          Modalidades
        </h1>
        <article className="bg-white/5 w-[95%] h-full flex justify-center flex-wrap gap-2 border-2 border-gradient-rounded px-8 py-4 overflow-auto max-w-[500px]">
          <Fade triggerOnce cascade damping={0.15}>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Tailspin
                  width={40}
                  height={40}
                  color="#DD8D1B"
                  ariaLabel="Cargando..."
                />
              </div>
            ) : patterns.length > 0 ? (
              patterns.map((p, i) => (
                <article
                  className="flex flex-col items-center relative group"
                  key={i}
                >
                  <div className="absolute z-20 bottom-7 w-full h-0 overflow-hidden opacity-0 bg-coffee-gray rounded-xl p-2 text-sm text-center border-4 border-light-gold/75 text-white/90 transition-all duration-300 ease-in-out group-hover:h-[135px] group-hover:opacity-100">
                    <h2 className="font-bold text-[0.95rem] text-light-gold">
                      Descripción
                    </h2>
                    <p className="text-xs stable:text-sm">{p.description}</p>
                  </div>
                  <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem]">
                    {p.pattern.flat().map((cell, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center pt-[0.15rem] z-10"
                      >
                        {cell === 1 && (
                          <span className="size-[0.90rem] bg-[#76230C] rounded-full"></span>
                        )}
                      </div>
                    ))}
                    <img
                      src={EmptyCardBoard}
                      alt="Bingo cardboard"
                      className="outline-2 outline-[#000]/60 rounded-xl w-[7rem] h-auto absolute"
                    />
                  </div>
                  <h2 className="text-dark-gold font-bold">{p.name}</h2>
                </article>
              ))
            ) : (
              message
            )}
          </Fade>
        </article>
      </section>
    </>
  );
}
