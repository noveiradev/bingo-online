export default function NumbersHistory({ allNumbers }) {
  return (
    <div className="bg-[#3C3A3A] h-[6rem] w-full p-2 mt-2 rounded-md">
      <h2 className="text-white text-xs text-center mb-2 font-inter">
        Historial de números
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-5 grid-rows-2 gap-3">
          {(allNumbers.length > 0
            ? [...allNumbers].reverse().slice(0, 10)
            : Array.from({ length: 10 })
          ).map((n, i) => (
            <span
              key={n ? `num-${n}` : `empty-${i}`}
              className="bg-[#372C2C]/60 w-[1.35rem] h-[1.35rem] font-medium rounded-sm text-sm text-white text-center leading-[1.25rem]"
            >
              {n || " "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
