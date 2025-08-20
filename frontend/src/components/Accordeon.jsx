import { useState } from "react";
import Arrow from "@/icons/Arrow";
import Button from "@/components/Button";
import Cancel from "@/icons/Cancel";
import Check from "@/icons/Check";
import { toast } from "@pheralb/toast";

import {
  rejectReserve,
  approveReserve,
  approveAllReserves,
} from "@/services/api/admin/manageCards";

export default function Accordeon({ userID, username, phone, cards }) {
  const [accordeonView, setAccordeonView] = useState(false);
  const [cardsQuantity, setCardsQuantity] = useState(cards.length);

  const formatNumbers = (numbersString) => {
    return numbersString.replace(/[[\]]/g, "");
  };

  const reject = async (cardId, userId, event) => {
    try {
      const reserveData = {
        cardId,
        userId,
      };
      const response = await rejectReserve.rejectCard(reserveData);

      if (response.success === false) {
        toast.error({
          text: `No se ha podido rechazar la reserva del cartón ${cardId}`,
        });
      } else {
        if (cardsQuantity === 1) {
          event.target.closest("section").remove();
        } else {
          event.target.closest("article").remove();
        }
        setCardsQuantity(cardsQuantity - 1);
        toast.success({
          text: `Reserva del cartón ${cardId} rechazada`,
        });
      }
    } catch (error) {
      console.error("Error al rechazar el cartón:", error);
      toast.error({
        text: `Error al rechazar el cartón ${cardId}`,
      });
    }
  };

  const approve = async (cardId, userId, event) => {
    try {
      const reserveData = {
        cardId,
        userId,
      };
      const response = await approveReserve.approveCard(reserveData);

      if (response.success === false) {
        toast.error({
          text: `No se ha podido validar la reserva del cartón ${cardId}`,
        });
      } else {
        if (cardsQuantity === 1) {
          event.target.closest("section").remove();
        } else {
          event.target.closest("article").remove();
        }
        setCardsQuantity(cardsQuantity - 1);
        toast.success({
          text: `Reserva del cartón ${cardId} validada`,
        });
      }
    } catch (error) {
      console.error("Error al validar el cartón:", error);
      toast.error({
        text: `Error al validar el cartón ${cardId}`,
      });
    }
  };

  const approveAll = async (event) => {
    try {
      const results = await approveAllReserves.approveAll({
        userId: userID,
      });

      if (results) {
        toast.success({
          text: `Todos los cartones han sido validados para ${phone}`,
        });
        event.target.closest("section").remove();
      } else {
        toast.error({
          text: "Algunos cartones no pudieron validarse",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error({
        text: "Error al validar los cartones",
      });
    }
  };

  return (
    <section className="relative w-full mb-3 flex flex-col items-center justify-center">
      <article
        onClick={() => setAccordeonView(!accordeonView)}
        className="relative z-10 w-full bg-coffee-gray h-[4rem] rounded-xl text-[#FFC62C] flex items-center justify-between px-6 cursor-pointer max-w-[500px] mx-auto"
      >
        <p className="font-semibold font-inter text-sm text-white">
          {phone}{" "}
          <span className="text-[#FFC62C]">({cardsQuantity} cartones)</span>
        </p>
        <Arrow
          w="16"
          h="15"
          className={`transition-transform ${
            accordeonView ? "rotate-180" : ""
          }`}
        />
      </article>

      <article
        className={`w-[65%] max-w-[500px] relative -mt-1 mx-auto bg-[#372c2c] rounded-b-xl transition-all duration-300 overflow-hidden border-3 border-[#FFC62C]/10 shadow-[#FFC623]/25 shadow-md flex flex-col ${
          accordeonView
            ? `max-h-[${200 * cards.length}px] p-2 pt-3 text-[#FFC62C]`
            : "max-h-0 text-transparent opacity-0"
        }`}
      >
        <span className="w-fit mx-auto p-1 px-2 text-sm rounded-lg bg-carbon-gray text-[#FFC62C]">
          {username}
        </span>

        {cards.map((card) => (
          <article
            key={card.card_id}
            className={`flex flex-col gap-2 mb-3 border-b border-[#FFC62C]/20 pb-2 ${
              accordeonView ? `` : "opacity-0"
            }`}
          >
            <div className="w-full flex flex-col gap-2 justify-between px-1">
              <div className="flex justify-between">
                <p>Cartón N° {card.card_id}</p>
                <div className="flex gap-1">
                  <Button
                    text={<Check />}
                    onClick={(e) => {
                      approve(card.card_id, userID, e);
                    }}
                    className="bg-green-apple/63 text-white text-sm px-2 rounded-md cursor-pointer"
                  />
                  <Button
                    text={<Cancel />}
                    onClick={(e) => {
                      reject(card.card_id, userID, e);
                    }}
                    className="bg-coral-red text-white text-sm px-2 rounded-md cursor-pointer"
                  />
                </div>
              </div>
              <p className="text-xs text-white/70">
                Números: {formatNumbers(card.numbers)}
              </p>
            </div>
          </article>
        ))}

        <Button
          text="Validar todos los cartones"
          onClick={approveAll}
          className="bg-green-apple/63 text-white px-2 py-1 rounded-md"
        />
      </article>
    </section>
  );
}
