import { Link } from "react-router-dom";

export default function LinkOption({ index, opt }) {
  return (
    <>
      <Link
        key={index}
        to={opt.path}
        className="flex flex-col h-[7rem] justify-center items-center p-2 bg-white/10 w-[9rem] text-option border-2 border-dark-red rounded-[12px] shadow-[#DF8E1C]/20 shadow-md"
      >
        <img
          src={opt.img}
          alt={opt.text}
          className="w-12 h-12 drop-shadow-[0_0_10px_rgba(119,255,0,0.08)]"
        />
        <span className="text-md font-medium text-center">{opt.text}</span>
      </Link>
    </>
  );
}
