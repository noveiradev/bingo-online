import GoBack from "@/components/GoBack";
import Reminder from "@/components/Reminder";
import Input from "@/components/Input";
import SelectList from "@/components/SelectList";
import Button from "@/components/Button";

import { registerService } from "@/services/api/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@pheralb/toast";

import User from "@/icons/User";
import Phone from "@/icons/Phone";
import Key from "@/icons/Key";
import Answer from "@/icons/Answer";
import Question from "@/icons/Question";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true); // 🔒 bloquear

    try {
      const userData = {
        username: data.username,
        password: data.password,
        security_question: data.securityQuestion,
        security_answer: data.answer,
        phone: data.phone,
      };

      const response = await registerService.register(userData);

      if (response) {
        toast.success({
          text: "Registro exitoso!",
        });
        setTimeout(() => {
          navigate("/login", { state: { registrationSuccess: true } });
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error({ text: "Hubo un error en el registro" });
    } finally {
      setIsSubmitting(false); // 🔓 liberar
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-4 overflow-auto">
      <div className="flex w-full max-w-[500px] px-2">
        <GoBack />
      </div>
      <h1 className="text-dark-gold font-semibold font-poppins text-xl stable:text-2xl desk:text-2xl desklg:text-3xl">
        Registrate!
      </h1>
      <Reminder>
        Recuerda guardar tu contraseña y pregunta de seguridad por si olvidas
        tus credenciales, puedas recuperar tu cuenta!
      </Reminder>

      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="flex flex-col gap-2 mt-2 w-full">
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
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Número de teléfono"
            register={register}
            error={errors.phone}
            {...register("phone", {
              required: "Por favor llena todos los campos",
            })}
          >
            <Phone w={"22"} h={"22"} />
          </Input>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            register={register}
            error={errors.password}
            {...register("password", {
              required: "Por favor llena todos los campos",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          >
            <Key w={"22"} h={"22"} />
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
        </article>
        <article className="flex flex-col">
          <Button
            text={isSubmitting ? "Registrando..." : "Registrarse"}
            disabled={isSubmitting} // 🔒 bloqueo del botón
            className={`text-white w-[90%] mx-auto font-semibold py-2 px-4 rounded-[7px] mt-2 transition-colors duration-200 
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-yellow-cake/80 bg-linear-to-t from-[#794d10] to-[#D46613]"
              }`}
          />
        </article>
      </form>
    </section>
  );
}
