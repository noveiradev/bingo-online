import Arrow from "@/icons/Arrow";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex self-start items-center gap-1 cursor-pointer text-dark-gold font-semibold text-sm hover:text-light-gold transition-colors duration-200 bg-dark-red/60 py-2 px-3 rounded-full"
      >
        <span className="rotate-90">
          <Arrow w={"14"} h={"9"} color={"#FFC72C"} />
        </span>
        <span className="text-[#FFC72C] underline">Volver</span>
      </button>
    </>
  );
}
