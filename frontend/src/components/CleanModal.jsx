import Button from "@/components/Button";
import { Slide } from "react-awesome-reveal";

export default function CleanModal({ showModal, modalState, clearBoard }) {
  return (
    <>
      <section className="bg-[#000]/70 absolute z-20 top-0 left-0 w-full h-dvh">
        <Slide
          direction="up"
          triggerOnce
          duration={600}
          className="w-full h-full absolute"
        >
          <article className="max-w-[350px] w-[95%] h-fit pb-4 bg-white/10 mx-auto mt-24 backdrop-blur-2xl rounded-2xl shadow-[#000]/50 shadow-lg outline-[#4E4E4B] outline-3 font-poppins">
            <div className="p-4 py-5 flex flex-col gap-4">
              <h1 className="text-center font-bold text-[1.3rem] text-[#FAF2E7]">
                Estas seguro que quieres limpiar el tablero?
              </h1>
              <p className="text-[#FAF2E7]/85 text-center font-inter">Esto terminara la ronda que se esta jugando actualmente, asegurate de vaciar el tablero solo cuando la partida haya terminado o si ha ocurrido algún percance.</p>
            </div>
            <div className="px-4 flex justify-center gap-4">
              <span
                onClick={() => showModal(!modalState)}
                className="bg-coral-red text-center px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
              >
                No
              </span>
              <Button
                text="Si"
                onClick={() => {clearBoard(); showModal(!modalState);}}
                className="bg-green-apple/63 text-center px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
              />
            </div>
          </article>
        </Slide>
      </section>
    </>
  );
}
