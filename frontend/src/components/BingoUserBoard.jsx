export default function BingoUserBoard({ BINGO_COLUMNS, activeNumbers, newlyCalled, lastCalled }) {
  return (
    <section className="grid grid-cols-5 grid-rows-15 overflow-y-auto">
      {BINGO_COLUMNS.map((col) => (
        <div key={col.letter} className="border border-white/10">
          {Array.from({ length: 15 }, (_, i) => {
            const number = i + col.range[0];
            const isActive = activeNumbers[number];
            const isNew = newlyCalled[number];
            const isLastCalled = lastCalled?.num === number;

            return (
              <div
                key={number}
                className={`h-5 desk:h-3 desk:text-xs desk:mb-[0.07rem] desklg:text-sm desklg:h-5 desklg:mb-[0.065rem] flex mb-[0.065rem] font-semibold text-sm font-inter items-center justify-center transition-all duration-200
                  ${
                    isLastCalled
                      ? "bg-green-apple/85 text-white animate-pulse"
                      : isActive
                      ? `${col.color} text-white ${isNew ? "" : ""}`
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }
                  cursor-pointer relative`}
              >
                {number}
                {isActive && !isLastCalled && !isNew && (
                  <div className="absolute inset-0 border-[0.05rem] border-white/10 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}
