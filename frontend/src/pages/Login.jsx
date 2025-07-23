import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Logo from "@/assets/images/logo.png";
import User from "@/icons/User.jsx";
import Key from "@/icons/Key.jsx";
import { toast } from "@pheralb/toast";

import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const response = await login(data);

      if (response.success) {
        if (response.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error({
          text: "Datos incorrectos",
          description: "Verifica tus credenciales e inténtalo de nuevo",
        });
      }
    } catch (error) {
      setServerError(error.message || "Error al iniciar sesión");
      console.log(serverError);
      toast.error({
        text: "Error",
        description: error.message || "Ocurrió un error al iniciar sesión",
      });
    }
  };
  return (
    <>
      <section className="max-w-[768px] mx-auto h-full flex flex-col items-center mt-12">
        <h1 className="text-dark-gold font-semibold font-inter text-xl stable:text-4xl">
          Bienvenido al Bingo Online!
        </h1>
        <img
          src={Logo}
          alt="Bingo Online Logo"
          className="mt-[1.5rem] size-[15rem] stable:size-[18rem] drop-shadow-[0_0_30px_rgba(83,63,27,0.50)]"
        />
        <section className="flex flex-col items-center justify-center">
          <form
            className="flex flex-col mt-6 stable:mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <article className="flex flex-col gap-4">
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
                <User w="22" h="22" />
              </Input>

              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                register={register}
                {...register("password", {
                  required: "Por favor llena todos los campos",
                })}
              >
                <Key w="22" h="22" />
              </Input>
            </article>
            <Link to={"/forgot-password"} className="text-right">
              <span className="text-light-gold underline font-semibold text-sm">
                Olvidaste tu contraseña?
              </span>
            </Link>
            <article className="flex flex-col">
              <Button
                text="Iniciar Sesión"
                className="text-white font-semibold py-2 px-4 rounded-[7px] mt-4 hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] to-[#D46613] stable:text-[1.25rem]"
              />
              <div className="flex items-center justify-between w-[95%] mx-auto mt-[.5rem]">
                <span className="text-dark-gold text-sm font-semibold stable:text-[0.95rem]">
                  ¿No tienes cuenta?{" "}
                </span>
                <Link
                  to={"/register"}
                  className="text-gold underline text-right font-inter text-sm stable:text-[1rem]"
                >
                  ➡️Regístrate⬅️
                </Link>
              </div>
            </article>
          </form>
        </section>
      </section>
    </>
  );
}
