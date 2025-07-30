import EmptyCardboard from "@/assets/images/Carton-vacio.webp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@pheralb/toast";
import { reserveCard } from "@/services/api/cards";
import { Fade } from "react-awesome-reveal";

export default function CardToReserve({ cardsInfo = [], viewMode }) {
  const { user } = useAuth();

  const handleCardboardReserve = async (cardId, UID, event) => {
    try {
      const data = {
        cardId,
        userId: UID,
      };

      const response = await reserveCard.reserveCard(data);

      if (response.success === false) {
        toast.error({
          text: response.message,
        });
      } else {
        toast.success({
          text: "Cartón reservado exitosamente!",
          description: "Puedes ver tu cartón en la sección de Tus cartones",
        });

        event.target.closest("article").remove();
      }
    } catch (error) {
      console.error("Error obteniendo cartones:", error);
      toast.error({
        text: "Error",
        description: "No se ha podido apartar este cartón",
      });
    }
  };

  const parseNumbers = (numbers) => {
    try {
      if (Array.isArray(numbers)) {
        return numbers;
      }

      if (typeof numbers === "string") {
        const cleanedString = numbers.replace(/\s/g, "");
        const parsed = JSON.parse(cleanedString);

        return parsed.map((item) => (item === "free" ? "free" : item));
      }

      return [];
    } catch (error) {
      console.error("Error parsing bingo numbers:", error);
      return [];
    }
  };

  if (!cardsInfo || cardsInfo.length === 0) {
    return (
      <article className="flex flex-col items-center gap-2 pt-5">
        <h2 className="text-dark-gold font-semibold font-poppins text-2xl">
          Aviso!!
        </h2>
        <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
          No hay cartones disponibles actualmente
        </p>
      </article>
    );
  }

  return (
    <>
      <Fade cascade damping={0.25}>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {cardsInfo.map((card) => {
              const numbersArray = parseNumbers(card.numbers);

              return (
                <article
                  key={card.id}
                  className="flex flex-col items-center bg-white/10 p-3 py-2 rounded-xl h-fit"
                >
                  <h2 className="text-md font-poppins font-semibold text-[#FFC62C]">
                    Cartón N° {card.id}
                  </h2>
                  <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem]">
                    {numbersArray.map((number, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center text-xs font-bold z-10"
                      >
                        {number === "free" ? "" : number}
                      </div>
                    ))}
                    <img
                      src={EmptyCardboard}
                      alt="Bingo cardboard"
                      className="outline-2 outline-[#000]/60 rounded-xl w-[7rem] h-auto absolute"
                    />
                  </div>
                  <button
                    className="bg-green-apple/63 text-white mt-2 font-medium px-2 py-1 rounded-md text-center text-sm w-full"
                    onClick={(e) => handleCardboardReserve(card.id, user.id, e)}
                  >
                    Apartar
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {cardsInfo.map((card) => {
              const numbersArray = parseNumbers(card.numbers);

              return (
                <article
                  key={card.id}
                  className="flex flex-col items-center bg-white/10 p-3 py-2 rounded-xl h-fit w-full"
                >
                  <h2 className="text-sm font-poppins font-semibold text-[#FFC62C]">
                    Cartón N° {card.id}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 w-full p-2 bg-brilliant-green/20 rounded-lg">
                    {numbersArray.map(
                      (number, index) =>
                        number !== "free" && (
                          <span
                            key={index}
                            className="text-xs font-medium text-white"
                          >
                            {number}
                          </span>
                        )
                    )}
                  </div>
                  <button
                    className="bg-green-apple/63 text-white mt-2 font-medium px-2 py-1 rounded-md text-center text-sm w-full"
                    onClick={(e) => handleCardboardReserve(card.id, user.id, e)}
                  >
                    Apartar
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </Fade>
    </>
  );
}
