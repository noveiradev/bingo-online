import { useState, useEffect, useCallback } from "react";
import EmptyCardboard from "@/assets/images/Carton-vacio.webp";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";
import { toast } from "@pheralb/toast";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { matchService } from "@/services/api/user/match";
import BINGO from "@/assets/images/BingoBoard.webp";
import { JackInTheBox } from "react-awesome-reveal";
import { useParams } from "react-router-dom";

export default function PlayCard({
  cardNumber,
  numbersArray,
  cardId,
  reservationId,
  selected,
  onToggleSelect,
  processed,
}) {
  const { user } = useAuth();
  const { id } = useParams();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const numbers = Array.isArray(numbersArray)
    ? numbersArray
    : JSON.parse(numbersArray.replace(/free/g, '"free"'));

  const storageKey = `playcard_marks_${user?.id || "anon"}_${cardNumber}`;

  const [markedItems, setMarkedItems] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo marcados de localStorage:", e);
    }
    return [];
  });

  const markedIndexes = new Set(markedItems.map((it) => it.index));

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(markedItems));
    } catch (e) {
      console.warn("Error guardando marcados en localStorage:", e);
    }
  }, [markedItems, storageKey]);

  useEffect(() => {
    const markedValues = markedItems
      .map((it) => it.value)
      .filter((v) => v != null);

    const cardData = {
      reservationId,
      gameId: Number(id),
      cardId,
      markedNumbers: markedValues,
    };

    const existingCards = JSON.parse(localStorage.getItem("cards_data")) || [];
    const updatedCards = existingCards.filter((c) => c.cardId !== cardId);
    updatedCards.push(cardData);

    localStorage.setItem("cards_data", JSON.stringify(updatedCards));
  }, [markedItems, reservationId, id, cardId]);

  const getMarkedValues = () => {
    return markedItems.map((it) => it.value).filter((v) => v != null);
  };

  const toggleCell = useCallback(
    (idx) => {
      if (!processed) {
        toast.error({
          text: "No puedes marcar, el cartón si no lo has seleccionado para la partida.",
        });
        return;
      }

      const value = numbers[idx];
      
      let called = [];
      try {
        called = JSON.parse(localStorage.getItem("game_all_numbers") || "[]");
      } catch (error) {
        console.error(error);
      }
      const calledSet = new Set(called.map((n) => String(n)));

      if (!calledSet.has(String(value))) {
        toast.error({
          text: `El número ${value} aún no ha salido en la partida`,
        });
        return;
      }

      setMarkedItems((prev) => {
        const exists = prev.find((it) => it.index === idx);
        if (exists) {
          return prev.filter((it) => it.index !== idx);
        } else {
          return [...prev, { index: idx, value }];
        }
      });
    },
    [numbers, processed]
  );

  const handleSelectClick = () => {
    if (processed) return;
    onToggleSelect?.(reservationId);
  };

  const handleBingo = async (cardId) => {
    const markedValues = getMarkedValues();
    if (markedValues.length === 0) {
      toast.warning({
        text: "No has marcado ningún número para cantar bingo",
      });
      return;
    }

    try {
      const payload = {
        reservationId,
        gameId: Number(id),
        cardId,
        markedNumbers: markedValues,
      };

      const response = await matchService.markedNumbers(payload);

      if (!response || !response.data) {
        toast.error({ text: "Respuesta inesperada de los números marcados" });
        return;
      }

      const markedNumsFromServer = response.data.marked_numbers;
      if (
        Array.isArray(markedNumsFromServer) &&
        markedNumsFromServer.length > 0
      ) {
        const bingoPayload = {
          gameId: Number(id),
          cardId,
        };
        const bingoResponse = await matchService.validateBingo(bingoPayload);

        if (bingoResponse?.valid) {
          setShowConfetti(true);
          toast.success({
            text: `${bingoResponse.message} con tu cartón ${cardId}`,
          });

          localStorage.clear();
          
          setTimeout(() => {
          window.location.reload();
          }, 120000);
        } else {
          toast.info({
            text: `Aún no tienes BINGO con el cartón ${cardId}`,
          });
        }
      } else {
        toast.info({
          text: "No hay números marcados válidos para validar BINGO",
        });
      }
    } catch (e) {
      console.error("Error en BINGO():", e);
      toast.error({ text: "Error cantando bingo" });
    }
  };

  return (
    <>
      {showConfetti && (
        <div className="flex justify-center items-center absolute -top-100 left-0 w-full h-dvh z-70 bg-black/50">
          <JackInTheBox triggerOnce duration={1800}>
            <img
              src={BINGO}
              alt="Bingo advice"
              className="w-[15rem] mb-16 h-auto"
              style={{
                filter: `
                  drop-shadow(0 30px 60px rgba(0,0,0,0.8))
                  drop-shadow(0 0 20px rgba(255,215,0,0.8))
                  drop-shadow(0 0 4px rgba(255,255,255,0.9))
                `,
              }}
            />
          </JackInTheBox>
          <Confetti
            width={width}
            height={height}
            tweenDuration={500}
            numberOfPieces={300}
          />
        </div>
      )}

      <article
        onClick={handleSelectClick}
        className={`
          relative flex flex-col items-center p-2 rounded-xl h-fit transition-all bg-black/25 max-w-[180px] mx-auto w-[100%]
          ${!selected && !processed ? " border-transparent" : ""}
          ${selected ? "ring-2 ring-blue-200" : ""}
          ${processed ? "bg-black/25 border-green-apple border-2" : ""}
        `}
      >
        <h2 className="text-sm mb-1 font-poppins font-semibold text-[#FFC62C]">
          Carton N° {cardNumber}
        </h2>

        <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem] justify-center items-center">
          {numbers.map((number, index) => {
            const isMarked = markedIndexes.has(index);
            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCell(index);
                }}
                className={`
                  flex items-center justify-center text-xs font-bold z-10 cursor-pointer select-none rounded-full transition-all text-center
                  ${isMarked ? "bg-white" : "bg-transparent"}
                `}
                style={{ width: "90%", height: "90%" }}
              >
                {number === "free" ? null : number}
              </div>
            );
          })}
          <img
            src={EmptyCardboard}
            alt="Bingo cardboard"
            className="outline-2 outline-[#000]/60 rounded-xl w-[7rem] h-auto absolute"
          />
        </div>

        <div className="mt-2 flex items-center justify-between w-full">
          {processed ? (
            <Button
              text="Cantar BINGO"
              onClick={(e) => {
                e.stopPropagation();
                handleBingo(cardId);
              }}
              type={"button"}
              className="cursor-pointer w-full flex justify-center text-xs font-medium text-white font-inter bg-green-600 hover:bg-green-500 px-2 py-1 rounded"
            />
          ) : selected ? (
            <div className="flex w-full justify-center items-center gap-1 text-sm text-white">
              Seleccionar
              <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
          ) : (
            <div className="flex w-full justify-center items-center gap-1 text-sm text-white">
              Seleccionar
              <span className="w-5 h-5 rounded-full border-2 border-gray-100"></span>
            </div>
          )}
        </div>
      </article>
    </>
  );
}