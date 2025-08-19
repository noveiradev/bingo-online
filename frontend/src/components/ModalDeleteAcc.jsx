import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccount } from "@/services/api/auth";
import { toast } from "@pheralb/toast";
import { useNavigate } from "react-router-dom";

import Key from "@/icons/Key";
import Trash from "@/icons/Trash";
import Input from "@/components/Input";

export default function ModalDeleteAcc({ modalFunction, modalView }) {
  const { user } = useAuth();

  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleAccept = () => {
    setShowAcceptModal(true);
  };

  const handleCloseAll = () => {
    setShowAcceptModal(false);
    modalFunction(false);
  };

  if (!modalView) return null;

  return (
    <>
      {!showAcceptModal ? (
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
                Esta acción no se puede deshacer y eliminará tu cuenta de manera
                permanente.
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <span
                  onClick={() => modalFunction(false)}
                  className="bg-coral-red px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
                >
                  No
                </span>
                <span
                  onClick={handleAccept}
                  className="bg-militar-green px-10 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
                >
                  Si
                </span>
              </div>
            </div>
          </article>
        </section>
      ) : (
        <AcceptDelete onClose={handleCloseAll} uid={user.id} />
      )}
    </>
  );
}

const AcceptDelete = ({ onClose, uid }) => {
  const [fillInput, setFillInput] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {

      if (data.password === ''){
        setFillInput(true)
      } else {
        setFillInput(false)
      }
      const userData = {
        user: {
          id: uid,
        },
        password: data.password,
      };

      const response = await deleteAccount.delete(userData);

      if (response.success) {
        toast.success({
          text: "Tu cuenta ha sido eliminada!",
          description: "Gracias por jugar con nosotros❤️",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error({
          text: response.message,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <section className="absolute z-10 top-0 left-0 w-full h-dvh bg-[#000]/60">
      <article className="max-w-[350px] w-[95%] h-[18rem] bg-white/10 mx-auto mt-24 backdrop-blur-lg rounded-2xl shadow-[#000]/50 shadow-lg outline-[#4E4E4B] outline-3 font-poppins">
        <div className="p-2 py-5 flex flex-col gap-2">
          <h1 className="text-center font-bold text-[1.4rem] text-[#FAF2E7]">
            Ingresa tu contraseña
          </h1>
          <p className="text-[#FAF2E7] text-center text-m">
            Necesitamos verificar que eres tu quien desea eliminar la cuenta!
          </p>
          <form
            id="delAcc"
            className="w-[15rem] mx-auto p-2 pt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              register={register}
              error={errors.password}
              {...register("password", {
                required: ""
              })}
            >
              <Key w={"22"} h={"22"} />
            </Input>
          </form>
          <div className="flex justify-center mt-4 gap-4 ">
            <button
              onClick={onClose}
              className="bg-green-apple/63 px-3 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={""}
              form="delAcc"
              className={`bg-coral-red px-3 py-2 text-white rounded-md shadow-[#000]/40 shadow-md cursor-pointer`}
            >
              Eliminar
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
