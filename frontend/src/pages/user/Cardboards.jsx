import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { userCards } from "@/services/api/cards";

import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";
import OwnedCardboard from "@/components/Cards/OwnedCardboard";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function Cardboards() {
  const { user } = useAuth();
  const [cardboards, setCardboards] = useState([]);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const parseBingoNumbers = (numbersString) => {
    try {
      if (Array.isArray(numbersString)) {
        return numbersString;
      }

      if (typeof numbersString === "string") {
        const cleanedString = numbersString.replace(/\s/g, "");
        const parsed = JSON.parse(cleanedString);

        return parsed.map((item) => (item === "free" ? "free" : item));
      }

      return [];
    } catch (error) {
      console.error("Error parsing bingo numbers:", error);
      return [];
    }
  };

  useEffect(() => {
    const getCardboards = async () => {
      setIsLoading(true);
      try {
        const userData = { id: user.id };
        const response = await userCards.userCards(userData);

        if (response.success === false) {
          setMessage(
            <article className="flex flex-col items-center gap-2">
              <h2 className="text-dark-gold font-semibold font-poppins text-2xl">
                Aviso!!
              </h2>
              <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
                En estos momentos no dispones de ningún cartón, aparta y paga tu
                cartón para que puedas jugar!
              </p>
            </article>
          );
        } else if (response.data) {
          const parsedCards = response.data.map((card) => ({
            ...card,
            parsedNumbers: parseBingoNumbers(card.numbers),
          }));
          setCardboards(parsedCards);
          setMessage(null);
        }
      } catch (error) {
        console.error("Error obteniendo cartones:", error);
        setMessage(
          <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
            Ocurrió un error al cargar tus cartones, inténtalo más tarde!
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
  }, [user]);

  return (
    <>
      <section className="max-w-[768px] h-full mx-auto flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Tus cartones
        </h1>
        <Reminder>
          <div className="font-semibold">
            <p>Aquí podrás ver tus cartones apartados y validados.</p>
            <ul className="list-disc pl-4 text-left text-xs font-normal">
              <li>Cartones validados ✅</li>
              <li>Cartones apartados o no validados ❎</li>
              <li>Cartones de regalo 🎁</li>
            </ul>
          </div>
        </Reminder>

        <article className="relative flex flex-wrap justify-center gap-2 w-[95%] h-full bg-white/10 border-2 border-gradient-rounded px-2 py-2 overflow-auto mt-1 max-w-[500px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Tailspin
                width={40}
                height={40}
                color="#DD8D1B"
                ariaLabel="Cargando..."
              />
            </div>
          ) : cardboards.length > 0 ? (
            cardboards.map((card) => (
              <OwnedCardboard
                key={card.id}
                cardNumber={card.id}
                pay={card.payment_status}
                is_gift={card.is_gift}
                numbersArray={card.parsedNumbers}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {message}
            </div>
          )}
        </article>
      </section>
    </>
  );
}
