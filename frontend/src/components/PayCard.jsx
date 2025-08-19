import Button from "@/components/Button";
import BankIcon from "@/icons/BankCenter";
import { Link } from "react-router-dom";
import { payInformation } from "@/services/api/admin/payInformation";
import { toast } from "@pheralb/toast";

export default function PayCard({
  id,
  bank,
  phone,
  id_number,
  name,
  isActive,
}) {
  const handleDeletePayment = async (id, event) => {
    try {
      const response = await payInformation.delete({ id });

      if (response) {
        toast.success({ text: "Pago móvil eliminado correctamente" });
        event.target.closest("article").remove();
      }
    } catch (error) {
      console.error("Error al eliminar el pago móvil:", error);
    }
  };

  const handleActivePayment = async (id) => {
    try {
      const response = await payInformation.activate({ id });

      if (response) {
        toast.success({ text: "Pago móvil activado correctamente" });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al activar el pago móvil:", error);
    }
  };

  return (
    <article className="flex w-full flex-col stable:flex-row stable:gap-6 items-center gap-2 bg-white/8 border-2 border-white/15 rounded-lg p-3">
      <span className="hidden stable:block">
        <BankIcon w={"64"} h={"64"} color={"#FFFFFF50"} />
      </span>
      <div className="flex flex-col stable:flex-row gap-2 justify-between items-center w-full">
        <div className="flex w-full flex-col">
          <h3 className="text-white font-medium font-poppins">{bank}</h3>
          <p className="text-sm text-[#F6BB2D] font-inter">{name}</p>
          <p className="text-sm text-[#F6BB2D] font-inter">
            Cédula: {id_number}
          </p>
          <p className="text-sm text-[#F6BB2D] font-inter">Teléfono: {phone}</p>
        </div>
        <div className="flex gap-2 stable:flex-col">
          <Button
            text={`${isActive ? "En uso" : "Usar"}`}
            disabled={isActive}
            className={`font-inter text-sm w-[7rem]  cursor-pointer ${
              isActive
                ? "bg-[#44728E]/65 text-white/65"
                : "bg-[#44728E] text-white"
            } rounded-lg px-3 py-[0.25rem] transition-colors`}
            onClick={() => (isActive ? null : handleActivePayment(id))}
          />
          <Button
            text="Eliminar"
            className={`font-inter text-sm w-[7rem] ${
              isActive
                ? "bg-coral-red/65 text-white/65"
                : "bg-coral-red text-white"
            } cursor-pointer rounded-lg px-4 py-[0.25rem] transition-colors`}
            onClick={(e) => (isActive ? null : handleDeletePayment(id, e))}
          />
        </div>
      </div>
    </article>
  );
}
