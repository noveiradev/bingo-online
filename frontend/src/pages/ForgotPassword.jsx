import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { passwordService } from "@/services/api/auth";

import User from "@/icons/User";
import Key from "@/icons/Key";
import Answer from "@/icons/Answer";
import Question from "@/icons/Question";

import { toast } from "@pheralb/toast";
import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";
import Input from "@/components/Input";
import SelectList from "@/components/SelectList";
import Button from "@/components/Button";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setDisabled((prev) => !prev);
    try {
      const userData = {
        username: data.username,
        security_question: data.securityQuestion,
        security_answer: data.answer,
        new_password: data.password,
      };

      const response = await passwordService.password(userData);

      if (response) {
        setDisabled((prev) => !prev);

        toast.success({
          text: "Recuperación exitosa!"
        })
        setTimeout(() => {
          navigate("/login", { state: { registrationSuccess: true } });
        }, 2000);
      } else {
        setDisabled((prev) => !prev);
      }
    } catch (error) {
      setDisabled((prev) => !prev);
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center py-4 overflow-auto">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mt-2 stable:text-3xl desk:text-2xl desklg:text-3xl">
          Recuperar contraseña
        </h1>
        <Reminder>
          Ingresa tu nombre de usuario con el que te registraste, responde la
          pregunta de seguridad correspondiente a tu cuenta y establece tu nueva
          contraseña
        </Reminder>

        <form onSubmit={handleSubmit(onSubmit)}>
          <article className="flex flex-col gap-2 mt-2 desk:gap-2 desk:mt-4 desklg:gap-3 desklg:mt-4 w-full">
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Nombre de usuario"
              register={register}
              error={errors.username}
              {...register("username", {
                required: "Por favor llena todos los campos",
              })}
            >
              <User w={"22"} h={"22"} />
            </Input>
            <SelectList
              register={register}
              name="securityQuestion"
              id="securityQuestion"
              error={errors.securityQuestion}
              {...register("securityQuestion", {
                required: "Por favor llena todos los campos",
              })}
            >
              <Question w={"22"} h={"22"} />
            </SelectList>
            <Input
              type="text"
              name="answer"
              id="answer"
              placeholder="Respuesta"
              register={register}
              error={errors.answer}
              {...register("answer", {
                required: "Por favor llena todos los campos",
              })}
            >
              <Answer w={"22"} h={"22"} />
            </Input>

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Nueva contraseña"
              register={register}
              error={errors.password}
              {...register("password", {
                required: "Por favor llena todos los campos",
              })}
            >
              <Key w={"22"} h={"22"} />
            </Input>
          </article>

          <article className="flex flex-col">
            <Button
              text="Confirmar"
              disabled={disabled}
              className={`${disabled ? "cursor-not-allowed bg-gray-800" : "text-white cursor-pointer"} w-[90%] mx-auto font-semibold py-2 px-4 rounded-[7px] mt-2 hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] to-[#D46613] stable:text-[1rem] desk:text-[1rem] desklg:text-[1.25rem]`}
            />
          </article>
        </form>
      </section>
    </>
  );
}
