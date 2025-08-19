import EmptyCardboard from "@/assets/images/Carton-vacio.webp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@pheralb/toast";
import Button from "@/components/Button";
import { cancelReserve } from "@/services/api/cards";

export default function OwnedCardboard({
  cardNumber,
  pay,
  is_gift,
  numbersArray,
}) {
  const { user } = useAuth();

  let gift = is_gift === 1 ? "gift" : "";

  const cardSigns = {
    paid: "✅",
    pending: "❎",
    gift: "🎁",
  };

  const numbers = Array.isArray(numbersArray)
    ? numbersArray
    : JSON.parse(numbersArray.replace(/free/g, '"free"'));

  const handleCancelReserve = async (cardId, event) => {
    try {
      const userData = { id: user.id, cardId };
      const response = await cancelReserve.cancelReserve(userData);

      if (response.success) {
        toast.success({
          text: response.message,
        });

        event.target.closest("article").remove();
      } else {
        toast.error({
          text: response.message,
        });
      }
    } catch (error) {
      console.error("Error obteniendo cartones:", error);
    }
  };
  return (
    <>
      <article className="flex flex-col items-center bg-white/10 p-2 py-2 rounded-xl h-fit">
        <h2 className="text-sm mb-1 font-poppins font-semibold text-[#FFC62C]">
          Carton N° {cardNumber} {cardSigns[gift || pay]}
        </h2>
        <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem]">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-xs font-bold z-10"
            >
              {number === "free" ? (
                <span className="text-[8px]"></span>
              ) : (
                number
              )}
            </div>
          ))}
          <img
            src={EmptyCardboard}
            alt="Bingo cardboard"
            className="outline-2 outline-[#000]/60 rounded-xl w-[7rem] h-auto absolute"
          />
        </div>
        <div className="flex gap-2">
          <Button
            text="Cancelar"
            className={`${pay === "pending" ? "bg-coral-red text-white" : "bg-coral-red/50 text-white/50"}  mt-2 font-medium px-2 py-1 rounded-md text-center text-sm w-full cursor-pointer`}
            onClick={
              pay === "pending"
                ? (e) => handleCancelReserve(cardNumber, e)
                : () => {}
            }
          />
        </div>
      </article>
    </>
  );
}
