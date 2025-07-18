import GoBack from "@/components/GoBack";

export default function PayInformation() {
  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Pago móvil
        </h1>
      </section>
    </>
  );
}
