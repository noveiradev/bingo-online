export default function ModalMobilePay({ modalFunction, payData }) {
  return (
    <>
      <section className="absolute z-10 top-0 left-0 w-full h-dvh bg-[#000]/60">
        <article className="max-w-[350px] w-[95%] h-[25rem] bg-white/10 mx-auto mt-24 backdrop-blur-lg rounded-2xl shadow-[#000]/50 shadow-lg outline-[#4E4E4B] outline-3 font-poppins">
          <div className="p-2 py-5 flex flex-col gap-2">
            <h1 className="text-center font-bold text-[1.6rem] text-[#FAF2E7]">
              Datos de pago móvil
            </h1>
            <p className="text-[#FAF2E7] text-center text-md"></p>
          </div>
          <span className="flex justify-center my-1"></span>
          <div className="p-2 py-5 flex flex-col gap-2">
            <span
              onClick={() => modalFunction(!payData)}
              className="bg-deep-blue text-center px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
            >
              Cerrar
            </span>
          </div>
        </article>
      </section>
    </>
  );
}
