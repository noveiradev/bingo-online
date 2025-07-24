import GoBack from "@/components/GoBack";

export default function PayInformation() {
  return (
    <>
      <section className="max-w-[768px] mx-auto h-full flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
          Pago móvil
        </h1>
        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-hidden max-w-[500px]"></article>
      </section>
    </>
  );
}
