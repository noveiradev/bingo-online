import { useState } from "react";
import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";
import Input from "@/components/Input";

import Search from "@/icons/Search";
export default function ReserveCardboard() {
  const [view, setView] = useState("grid");

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Apartar cartones
        </h1>
        <Reminder>
          <p className="">
            Los cartones ya apartados por otros jugadores no se mostrarán en
            esta página.
          </p>
        </Reminder>
        <div className="flex px-2 gap-2 items-center justify-between h-[4rem]">
          <Input placeholder="Buscar por número">
            <Search />
          </Input>
          <div className="flex h-full items-center gap-1">
            <button
              className={`${
                view === "grid"
                  ? "bg-deep-red/51 border-2 border-green-apple text-green-apple font-semibold"
                  : "bg-white/20 text-[#FAF2E7]/60 font-semibold"
              } w-[6rem] px-2 py-2 rounded-md`}
              onClick={() => setView("grid")}
            >
              Cuadricula
            </button>
            <button
              className={`${
                view === "list"
                  ? "bg-deep-red/51 border-2 border-green-apple text-green-apple font-semibold"
                  : "bg-white/20 text-[#FAF2E7]/60 font-semibold"
              } w-[6rem] px-2 py-2 rounded-md`}
              onClick={() => setView("list")}
            >
              Lista
            </button>
          </div>
        </div>
        <article className="grid grid-cols-2 gap-2 mt-2 px-2"></article>
      </section>
    </>
  );
}
