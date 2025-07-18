import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateService } from "@/services/api/auth";

import Input from "@/components/Input";
import GoBack from "@/components/GoBack";

import Button from "@/components/Button";
import Phone from "@/icons/Phone";
import Key from "@/icons/Key";
import Trash from "@/icons/Trash";

export default function Settings() {
  const [message, setMessage] = useState("");
  const [modalView, setModalView] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = {
        password: data.newpassword,
        phone: data.newphone,
        oldpassword: data.password,
        oldphone: data.phone,
      };

      const response = await updateService.update(userData);

      if (response) {
        setMessage("Cambios guardados exitosamente!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleDeleteAccount = () => {}; // Hacer fetch para eliminar la cuenta
  
  return (
    <>
      <section className="relative max-w-[768px] mx-auto flex flex-col items-center h-dvh overflow-hidden pt-4">
        {modalView && (
          <>
            <section className="absolute z-10 top-0 left-0 w-full h-dvh bg-[#000]/60">
              <article className="max-w-[350px] w-[95%] h-[25rem] bg-white/10 mx-auto mt-24 backdrop-blur-lg rounded-2xl shadow-[#000]/50 shadow-lg outline-[#4E4E4B] outline-3 font-poppins">
                <div className="p-2 py-5 flex flex-col gap-2">
                  <h1 className="text-center font-bold text-[1.6rem] text-[#FAF2E7]">
                    Eliminar tu cuenta
                  </h1>
                  <p className="text-[#FAF2E7] text-center text-md">
                    Querido usuario estas seguro que quieres eliminar tu cuenta?
                  </p>
                </div>
                <span className="flex justify-center my-1">
                  <Trash w="100" h="100" color="#FFFFFF" />
                </span>
                <div className="p-2 py-5 flex flex-col gap-2">
                  <p className="text-[#FAF2E7] text-center text-sm">
                    Esta acción no se puede deshacer y eliminará tu cuenta de
                    manera permanente.
                  </p>
                  <div className="flex justify-center gap-4 mt-2">
                    <span onClick={() => setModalView(!modalView)} className="bg-coral-red px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer">No</span>
                    <span className="bg-militar-green px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer">Si</span>
                  </div>
                </div>
              </article>
            </section>
          </>
        )}
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Configuración
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-hidden relative"
        >
          <article className="flex flex-col gap-3 mt-6 w-full">
            <p className="text-sm text-center text-simple-gold underline font-poppins font-semibold">
              Cambiar contraseña
            </p>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              register={register}
              error={errors.password}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            >
              <Key w={"22"} h={"22"} />
            </Input>
            <Input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="Nueva contraseña"
              register={register}
              error={errors.newpassword}
              {...register("newpassword", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            >
              <Key w={"22"} h={"22"} />
            </Input>

            <p className="text-sm text-center text-simple-gold underline font-poppins font-semibold">
              Cambiar número de teléfono
            </p>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Número de teléfono"
              register={register}
              error={errors.phone}
            >
              <Phone w={"22"} h={"22"} />
            </Input>
            <Input
              type="text"
              name="newphone"
              id="newphone"
              placeholder="Nuevo número de teléfono"
              register={register}
              error={errors.newphone}
            >
              <Phone w={"22"} h={"22"} />
            </Input>
          </article>

          <article className="flex flex-col">
            <Button
              text="Guardar"
              className="text-white w-[90%] mx-auto font-semibold py-2 px-4 rounded-[7px] mt-4 hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] to-[#D46613]"
            />
            {message && <p className="text-gold text-center mt-2">{message}</p>}
          </article>
          <span
            onClick={() => setModalView(!modalView)}
            className="text-[#FF9A9A] underline font-semibold font-poppins text-center mx-auto absolute bottom-50 left-0 right-0 cursor-pointer"
          >
            Eliminar cuenta
          </span>
        </form>
      </section>
    </>
  );
}
