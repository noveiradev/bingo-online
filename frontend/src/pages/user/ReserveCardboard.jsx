import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { availableCards, cardPrice } from "@/services/api/cards";

import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";
import CardToReserve from "@/components/Cards/CardToReserve";
import Input from "@/components/Input";
import Search from "@/icons/Search";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function ReserveCardboard() {
  const [view, setView] = useState("grid");
  const { user } = useAuth();
  const [cardboards, setCardboards] = useState([]);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardPriceValue, setCardPriceValue] = useState("");

  useEffect(() => {
    const getCardboards = async () => {
      setIsLoading(true);

      try {
        const response = await availableCards.availableCards();

        if (response.length === 0) {
          setMessage(
            <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
              No hay cartones disponibles en estos momentos
            </p>
          );
        } else {
          setCardboards(response);
          setMessage(null);
        }
      } catch (error) {
        console.error("Error obteniendo cartones:", error);
        setIsLoading(false);
        setMessage(
          <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
            Ocurrió un error al cargar los cartones, intentalo mas tarde!
          </p>
        );
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, [1000]);
      }
    };

    if (user?.id) {
      getCardboards();
    }

    const handleCardPrice = async () => {
      try {
        const response = await cardPrice.obtain();
        if (response?.price) {
          setCardPriceValue(response.price);
        } else {
          setCardPriceValue(0);
        }
      } catch (error) {
        console.error("Error handleCardPrice function: ", error);
      }
    };

    handleCardPrice();

  }, [user]);

  const filteredCardboards =
    cardboards.data?.filter((card) =>
      card.id.toString().includes(searchTerm)
    ) || [];

  return (
    <>
      <section className="max-w-[768px] mx-auto h-full flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Apartar cartones
        </h1>
        <Reminder>
          <p className="">
            Los cartones ya apartados por otros jugadores no se mostrarán en
            esta página.
          </p>
          <p className="mt-2 font-medium">
            Cada carton tiene un costo de{" "}
            <span className="text-brilliant-green font-semibold text-[0.95rem]">
              {cardPriceValue}Bs.
            </span>
          </p>
        </Reminder>
        <div className="flex px-2 py-2 gap-2 items-center justify-between h-[3.5rem]">
          <Input
            placeholder="Buscar por número"
            type="text"
            id="search"
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <Search />
          </Input>
          <div className="flex h-full items-center gap-1">
            <button
              className={`${
                view === "grid"
                  ? "bg-deep-red/51 outline-2 outline-green-apple text-green-apple font-semibold"
                  : "bg-white/20 text-[#FAF2E7]/60 font-semibold"
              } w-[6rem] px-2 py-2 rounded-md`}
              onClick={() => setView("grid")}
            >
              Cuadricula
            </button>
            <button
              className={`${
                view === "list"
                  ? "bg-deep-red/51 outline-2 outline-green-apple text-green-apple font-semibold"
                  : "bg-white/20 text-[#FAF2E7]/60 font-semibold"
              } w-[6rem] px-2 py-2 rounded-md`}
              onClick={() => setView("list")}
            >
              Lista
            </button>
          </div>
        </div>
        <article
          className={`relative flex ${
            view === "grid" ? "flex-wrap justify-center" : "flex-col"
          } gap-2 w-[95%] h-full bg-white/10 border-2 border-gradient-rounded max-w-[500px] px-2 py-2 overflow-auto`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Tailspin width={40} height={40} color="#DD8D1B" />
            </div>
          ) : filteredCardboards.length > 0 ? (
            <CardToReserve cardsInfo={filteredCardboards} viewMode={view} />
          ) : (
            <div className="w-full h-full flex items-center">
              {searchTerm ? (
                <p className="text-center w-[70%] mx-auto text-[#FAF2E7] font-inter">
                  No se encontraron cartones con el número {searchTerm}
                </p>
              ) : (
                message
              )}
            </div>
          )}
        </article>
      </section>
    </>
  );
}
