import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateService } from "@/services/api/auth";
import { clearCardboards } from "@/services/api/admin/manageCards";
import { toast } from "@pheralb/toast";

import Input from "@/components/Input";
import GoBack from "@/components/GoBack";

import Button from "@/components/Button";
import Phone from "@/icons/Phone";
import Key from "@/icons/Key";
import ModalDeleteAcc from "@/components/ModalDeleteAcc";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const [modalView, setModalView] = useState(false);
  const { user } = useAuth();

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
        toast.success({
          text: "Cambios guardados exitosamente!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const releaseCards = async () => {
    try {
      const response = await clearCardboards.releaseCards();

      if (response.success) {
        toast.success({
          text: "Cartones liberados exitosamente!",
        });
      } else {
        toast.error({
          text: "Ha ocurrido un error al liberar los cartones.",
        });
      }
    } catch (error) {
      console.error("Release error: ", error);
    }
  };

  return (
    <>
      <section className="relative max-w-[768px] mx-auto flex flex-col items-center h-full overflow-hidden pt-4">
        {modalView && (
          <ModalDeleteAcc modalFunction={setModalView} modalView={modalView} />
        )}
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl">
          Configuración
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-auto relative max-w-[500px]"
        >
          <article className="flex flex-col gap-3 mt-6 desk:mt-0 desk:gap-2 w-full">
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
              className="text-white w-[90%] mx-auto font-semibold py-2 px-4 desk:py-1 desklg:py-2 rounded-[7px] mt-4 desk:mt-2 hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] to-[#D46613] desk:text-sm desklg:text-[1rem]"
            />

            {user?.role === "admin" ? (
              <div className="mt-7 desk:mt-1 desklg:mt-6 w-full gap-2 flex flex-col items-center justify-center">
                <p className="text-sm text-center text-simple-gold underline font-poppins font-semibold">
                  Reestablece los cartones
                </p>
                <span
                  className="text-white w-[90%] mx-auto font-semibold py-2 px-4 rounded-[7px] hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] desk:text-sm desk:py-1 desklg:py-2 desklg:text-[1rem] to-[#D46613] text-center cursor-pointer"
                  onClick={() => {
                    releaseCards();
                  }}
                >
                  Vaciar cartones
                </span>
              </div>
            ) : null}
          </article>
          <span
            onClick={() => setModalView(!modalView)}
            className="text-[#FF9A9A] underline font-semibold font-poppins text-center mx-auto cursor-pointer flex justify-center mt-12"
          >
            Eliminar cuenta
          </span>
        </form>
      </section>
    </>
  );
}
