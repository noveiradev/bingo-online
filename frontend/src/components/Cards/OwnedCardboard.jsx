import EmptyCardboard from "@/assets/images/Carton-vacio.webp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@pheralb/toast";
import Button from "@/components/Button";
import { cancelReserve } from "@/services/api/cards";


export default function OwnedCardboard({ cardNumber, numbersArray }) {
  const { user } = useAuth();

  const numbers = Array.isArray(numbersArray)
    ? numbersArray
    : JSON.parse(numbersArray.replace(/free/g, '"free"'));

  const handleCancelReserve = async (cardId) => {
    try {
      const userData = { id: user.id, cardId };
      const response = await cancelReserve.cancelReserve(userData);

      if (response.success) {
        toast.success({
          text: response.message
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error({
          text: response.message
        });
      }
    } catch (error) {
      console.error("Error obteniendo cartones:", error);
    }
  };
  return (
    <>
      <article className="flex flex-col items-center bg-white/10 p-3 py-2 rounded-xl h-fit">
        <h2 className="text-md font-poppins font-semibold text-[#FFC62C]">
          Carton N° {cardNumber}
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
          {/* <button className="bg-green-apple/63 text-white mt-2 font-medium px-2 py-1 rounded-md text-center text-sm w-full">
            Descargar
          </button> */}
          <Button
            text="Cancelar"
            className="bg-coral-red text-white mt-2 font-medium px-2 py-1 rounded-md text-center text-sm w-full cursor-pointer"
            onClick={() => handleCancelReserve(cardNumber)}
          />
        </div>
      </article>
    </>
  );
}
