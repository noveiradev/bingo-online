export default function BingoBall({ lastCalled }) {
  return (
    <>
      <div id="bingo-ball" className="relative w-24 h-24 rounded-full bg-orange-400 shadow-[inset_0_-6px_10px_rgba(0,0,0,0.4)] border-[6px] border-[#633a16] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-orange-500 opacity-70" />
        <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#ffdb76] via-[#eab308] to-[#d97706]" />
        <div className="absolute top-2 left-3 w-12 h-6 bg-white opacity-30 rounded-full rotate-[-25deg] blur-sm pointer-events-none" />
        <span className="absolute z-10 text-[2.5rem] font-extrabold text-[#7b1c00] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]">
          {lastCalled.num}
        </span>
        <span className="absolute z-10 top-0 text-[1.25rem] font-extrabold text-[#7b1c00] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]">
          {lastCalled.letter}
        </span>
      </div>
    </>
  );
}
