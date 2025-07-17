import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";

export default function Cardboards() {
  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Tus cartones
        </h1>
        <Reminder>
          <p className="font-semibold">
            Aquí podrás ver tus cartones apartados y validados.
            <ul className="list-disc pl-4 text-left text-xs font-normal">
              <li>Tus cartones validados tendrán un ✅ junto al número.</li>
              <li>Tus cartones apartados o no validados tendrán una ❎ junto al número.</li>
              <li>Tus cartones de regalo tendrán un 🎁 junto al número.</li>
            </ul>
          </p>
        </Reminder>

        <article className="grid grid-cols-2 gap-2 mt-2 px-2"></article>
      </section>
    </>
  );
}
