import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { userCards } from "@/services/api/cards";
import { matchService } from "@/services/api/user/match";

import Cardboard from "@/assets/images/tus_cartones.webp";
import Arrow from "@/icons/Arrow";
import PlayCard from "@/components/Cards/PlayCard";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

const SELECTED_KEY = "active_selected_cardboards";
const PROCESSED_KEY = "processed_cardboards";

export default function CardboardsPlay({ roomId, updateActiveMatchData }) {
  const { user } = useAuth();
  const [cardboards, setCardboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCardBoards, setShowCardboards] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [selected, setSelected] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(SELECTED_KEY) || "[]");
      return Array.isArray(stored) ? stored.map(String) : [];
    } catch {
      return [];
    }
  });
  const [processed, setProcessed] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PROCESSED_KEY) || "[]");
      return Array.isArray(stored) ? stored.map(String) : [];
    } catch {
      return [];
    }
  });

  const parseBingoNumbers = (numbersString) => {
    try {
      if (Array.isArray(numbersString)) return numbersString;
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
          console.log("");
        } else if (response.data) {
          const parsedCards = response.data.map((card) => ({
            ...card,
            parsedNumbers: parseBingoNumbers(card.numbers),
          }));
          setCardboards(parsedCards);
        }
      } catch (error) {
        console.error("Error obteniendo cartones:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    if (user?.id) getCardboards();
  }, [user]);

  useEffect(() => {
    localStorage.setItem(SELECTED_KEY, JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem(PROCESSED_KEY, JSON.stringify(processed));
  }, [processed]);

  const toggleSelect = (reservationId) => {
    const idStr = String(reservationId);
    setSelected((prev) => {
      if (prev.includes(idStr)) return prev.filter((i) => i !== idStr);
      if (processed.includes(idStr)) return prev;
      return [...prev, idStr];
    });
  };

  const processSelected = async () => {
    if (selected.length === 0) return;
    try {
      setDisabled((prev) => !prev);

      const toProcess = selected.map(Number);
      const response = await matchService.joinMatch({
        reservationIds: toProcess,
        gameId: Number(roomId),
      });

      if (response.message) {
        setDisabled((prev) => !prev);
        updateActiveMatchData();
      }
      setProcessed((prev) =>
        Array.from(new Set([...prev, ...toProcess])).map(String)
      );
      setSelected([]);
    } catch (e) {
      console.error("Error procesando cartones:", e);
    }
  };

  return (
    <>
      <section
        className={`absolute bottom-0 left-0 right-0 flex justify-center items-center px-2 w-full ${showCardBoards ? "h-[43%] stable:h-[23rem] desk:h-[13rem] desklg:h-[24rem]" : "h-[3.2rem] desk:h-[3rem] desklg:h-[3.2rem]"
          } z-35 transition-all duration-300 `}
      >
        <article className="bg-dark-gold w-full h-full rounded-t-xl flex flex-col">
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => setShowCardboards(!showCardBoards)}
              className="text-dark-red font-bold flex gap-3 items-center pt-2"
            >
              <span className="h-[.10rem] rounded-xl bg-[#FFCA80] w-26"></span>
              {showCardBoards ? (
                <span>
                  <Arrow w={"20"} h={"12"} color={"#FFCA80"} />
                </span>
              ) : (
                <span className="rotate-180">
                  <Arrow w={"20"} h={"12"} color={"#FFCA80"} />
                </span>
              )}
              <span className="h-[.10rem] rounded-xl bg-[#FFCA80] w-26"></span>
            </button>
            <div className="flex items-center gap-2">
              <img
                src={Cardboard}
                alt="Tus cartones"
                className="w-[2rem] h-auto object-cover transition-all duration-300"
              />
              <h2 className="font-medium text-white">Tus cartones</h2>
              <img
                src={Cardboard}
                alt="Tus cartones"
                className="w-[2rem] h-auto object-cover transition-all duration-300"
              />
            </div>
          </div>

          {showCardBoards && (
            <article className="flex-1 overflow-y-auto min-h-0 p-2">
              {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                  <Tailspin
                    height="50"
                    width="50"
                    color="#FFCA80"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                <>
                  <div className={`w-full my-2 flex justify-center gap-2`}>
                    <button
                      onClick={selected.length === 0 ? null : processSelected}
                      disabled={disabled}
                      className={`px-2 py-2 text-xs rounded ${selected.length === 0 || disabled === true
                        ? "bg-red-500/70 text-white/85 cursor-not-allowed"
                        : "bg-red-500 text-white cursor-pointer"
                        }`}
                    >
                      Seleccionar cartones
                    </button>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full pb-4">
                    {cardboards
                      .filter(
                        (c) =>
                          c.payment_status === "paid" ||
                          c.payment_status === "gift"
                      )
                      .map((card) => (
                        <PlayCard
                          key={card.id}
                          cardId={card.id}
                          gameId={Number(roomId)}
                          reservationId={card.reservation_id}
                          cardNumber={card.id}
                          numbersArray={card.parsedNumbers}
                          selected={selected.includes(
                            String(card.reservation_id)
                          )}
                          processed={processed.includes(
                            String(card.reservation_id)
                          )}
                          onToggleSelect={toggleSelect}
                        />
                      ))}
                  </div>
                </>
              )}
            </article>
          )}
        </article>
      </section>
    </>
  );
}
