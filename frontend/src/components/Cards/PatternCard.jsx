import EmptyCardBoard from "@/assets/images/Carton-vacio.webp";

export default function PatternCard({ patterns, select }) {
  return (
    <>
      {patterns.length > 0 &&
        patterns.map((p, i) => (
          <article
            className="flex flex-col items-center relative group"
            key={i}
            onClick={() => {
              select(p.pattern, p.name, p.description, p.id);
            }}
          >
            <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem]">
              {p.pattern.flat().map((cell, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center pt-[0.15rem] z-10"
                >
                  {cell === 1 && (
                    <span className="size-[0.90rem] bg-[#76230C] rounded-full"></span>
                  )}
                </div>
              ))}
              <img
                src={EmptyCardBoard}
                alt="Bingo cardboard"
                className="outline-2 outline-[#000]/60 rounded-xl w-[7rem] h-auto absolute"
              />
            </div>
            <h2 className="text-dark-gold font-bold">{p.name}</h2>
          </article>
        ))}
    </>
  );
}
