export default function NumbersHistory({ allNumbers, viewType }) {
  // tomar hasta los últimos 10 y luego invertir para que el más reciente esté primero
  const recent = allNumbers && allNumbers.length > 0 ? allNumbers.slice(-10) : [];
  const reversed = [...recent].reverse();

  // rellenar hasta 10 con valores falsy
  const matchNumbers = [
    ...reversed,
    ...Array.from({ length: Math.max(0, 10 - reversed.length) }),
  ];

  return (
    <div
      className={`bg-[#3C3A3A] ${
        viewType ? "h-full" : "h-[6.5rem]"
      } w-full p-2 mt-2 rounded-md`}
    >
      <h2 className="text-white text-xs text-center mb-2 font-inter">
        Historial de números
      </h2>

      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-5 grid-rows-2 h-[5rem] overflow-y-hidden gap-1">
          {matchNumbers.map((n, i) => (
            <span
              key={n != null ? `num-${n}` : `empty-${i}`}
              className={`bg-[#372C2C]/60 w-[1.35rem] h-[1.35rem] font-medium rounded-sm text-sm text-white text-center leading-[1.25rem]`}
            >
              {n || " "}
            </span>
          ))}
        </div>
        {viewType && (
          <span className="text-white w-full h-[6rem] flex items-center bg-blue-gray/70 rounded-md p-2 text-sm text-center col-span-5">
            {allNumbers.length > 0
              ? `El último número llamado fue: ${allNumbers[allNumbers.length - 1]}`
              : "No hay números llamados"}
          </span>
        )}
      </div>
    </div>
  );
}
