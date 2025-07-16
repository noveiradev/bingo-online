import Phone from "@/icons/Phone";
import Key from "@/icons/Key";
import Answer from "@/icons/Answer";
import Question from "@/icons/Question";

import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";
import Input from "@/components/Input";
import SelectList from "@/components/SelectList";
import Button from "@/components/Button";

export default function ForgotPassword() {
  return (
    <>
      <section className="flex flex-col items-center justify-center pt-4 px-2">
        <div className="flex w-full max-w-[500px]">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mt-2">
          Recuperar contraseña
        </h1>
        <Reminder>
          Ingresa el nombre con el que te registraste, tu numero de telefono,
          responde la pregunta de seguridad correspondiente a tu cuenta y
          establece tu nueva contraseña
        </Reminder>

        <form>
          <article className="flex flex-col gap-3 mt-6 w-full">
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Número de teléfono"
            >
              <Phone w={"22"} h={"22"} />
            </Input>
            <SelectList>
              <Question w={"22"} h={"22"} />
            </SelectList>
            <Input
              type="text"
              name="answer"
              id="answer"
              placeholder="Respuesta"
            >
              <Answer w={"22"} h={"22"} />
            </Input>

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            >
              <Key w={"22"} h={"22"} />
            </Input>
          </article>

          <article className="flex flex-col">
            <Button
              text="Confirmar"
              className="text-white w-[90%] mx-auto font-semibold py-2 px-4 rounded-[7px] mt-4 hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] to-[#D46613]"
            />
          </article>
        </form>
      </section>
    </>
  );
}
