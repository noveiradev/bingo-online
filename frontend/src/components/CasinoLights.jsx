export default function CasinoLights({ location }) {
  return (
    <div className={`absolute ${location}-0 w-full h-[0.85rem] overflow-hidden bg-[#EFA418]`}>
      <div className="flex h-full items-center">
        {/* Contenedor animado */}
        <div className="flex animate-scroll-smooth">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="w-[0.50rem] h-[0.50rem] bg-[#FFFDC7] outline-[0.5px] outline-[#F4B00B] rounded-full blur-[0.09rem] mx-[0.15rem] flex-shrink-0"
            />
          ))}
        </div>
        
        {/* Contenedor duplicado (para efecto continuo) */}
        <div className="flex animate-scroll-smooth">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={`dup-${index}`}
              className="w-[0.50rem] h-[0.50rem] bg-[#FFFDC7] outline-[0.5px] outline-[#F4B00B] rounded-full blur-[0.09rem] mx-[0.15rem] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}