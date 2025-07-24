import GoBack from "@/components/GoBack";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Check from "@/icons/Check";
import EmptyCardBoard from "@/assets/images/Carton-vacio.webp";
import { useState } from "react";
import { registerPatterns } from "@/services/api/patterns";
import { toast } from "@pheralb/toast";

export default function CreatePatterns() {
  const [pattern, setPattern] = useState(
    Array(5)
      .fill()
      .map(() => Array(5).fill(0))
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const toggleCell = (rowIndex, colIndex) => {
    const newPattern = pattern.map((row, r) =>
      row.map((cell, c) =>
        r === rowIndex && c === colIndex ? (cell ? 0 : 1) : cell
      )
    );
    setPattern(newPattern);
  };

  const handleSubmit = async () => {
    try {
      const patternData = {
        name,
        description,
        pattern,
      };

      if (
        patternData.name === "" ||
        patternData.description === "" ||
        patternData.pattern === ""
      ) {
        toast.error({
          text: "Todos los campos son obligatorios.",
        });
      } else {
        const response = await registerPatterns.register(patternData);
        if (response) {
          toast.success({
            text: `Patrón de ${name} registrado correctamente!`,
          });
          setPattern(
            Array(5)
              .fill()
              .map(() => Array(5).fill(0))
          );
          setName("");
          setDescription("");
        }
      }
    } catch (error) {
      toast.error({
        text: `Error al guardar el patrón de ${name}`,
        description: error,
      });
      console.error("Error:", error);
    }
  };

  return (
    <section className="max-w-[768px] mx-auto h-full flex flex-col items-center justify-center pt-4">
      <div className="flex w-full max-w-[500px] px-2">
        <GoBack></GoBack>
      </div>
      <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
        Crear modalidad
      </h1>
      <article className="bg-white/5 w-[95%] h-full flex items-center flex-col gap-2 border-2 border-gradient-rounded px-2 py-4 pt-0 overflow-hidden">
        <header className="flex items-center justify-between gap-4 w-full max-w-[350px] h-[5rem]">
          <Input
            placeholder="Nombre"
            value={name}
            id="name"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          >
            <Check color="#ffffff80"></Check>
          </Input>
          <Button
            text="Guardar"
            onClick={handleSubmit}
            className="text-white bg-green-apple/60 py-[0.45rem] px-3 rounded-lg cursor-pointer"
          />
        </header>
        <article className="flex flex-col items-center">
          <div className="grid grid-cols-5 grid-rows-5 w-[16rem] h-[18.8rem] px-[1.6rem] pb-[1rem] relative pt-[4.35rem]">
            {pattern.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex items-center justify-center z-10 cursor-pointer"
                  onClick={() => toggleCell(rowIndex, colIndex)}
                >
                  {cell === 1 && (
                    <span className="size-[1.2rem] bg-dark-red rounded-full"></span>
                  )}
                </div>
              ))
            )}
            <img
              src={EmptyCardBoard}
              alt="Bingo card"
              className="outline-2 outline-[#000]/60 rounded-3xl w-[16rem] h-auto absolute"
            />
          </div>
        </article>
        <textarea
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe tu patrón!"
          className="mx-auto mt-3 bg-white/10 p-3 w-[16rem] stable:w-[21rem] rounded-lg resize-none border-2 border-white/15 text-white outline-none"
        ></textarea>
      </article>
    </section>
  );
}
