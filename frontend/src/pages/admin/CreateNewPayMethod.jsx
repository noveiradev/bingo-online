import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { payInformation } from "@/services/api/admin/payInformation";

import { toast } from "@pheralb/toast";
import Phone from "@/icons/Phone";
import ID from "@/icons/ID";
import Bank from "@/icons/Bank";
import User from "@/icons/User";
import BankIcon from "@/icons/BankCenter";

import GoBack from "@/components/GoBack";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function CreateNewPayMethod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = {
        id_number: data.id_number,
        bank: data.bank,
        phone: data.phone,
        name: data.name,
      };

      const response = await payInformation.create(userData);

      if (response.success) {
        toast.success({ text: "Registro del pago móvil exitoso!" });
        setTimeout(() => {
          navigate("/admin/pay-information");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col h-full items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
          Registrar pago móvil
        </h1>
        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-hidden max-w-[500px]">
          <div className="flex flex-col w-full justify-center items-center gap-2 mb-4">
            <BankIcon w={"100"} h={"100"} color="#FFFFFF50" />
            <h2 className="text-center text-[1.15rem] text-white/90 font-poppins">
              Introduce los datos de tu pago móvil
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <article className="flex flex-col gap-3 mt-6 w-full">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre y apellido"
                register={register}
                error={errors.name}
                {...register("name", {
                  required: "Por favor llena todos los campos",
                })}
              >
                <User w={"22"} h={"22"} />
              </Input>
              <Input
                type="text"
                name="id_number"
                id="id_number"
                placeholder="Número de cédula"
                register={register}
                error={errors.id_number}
                {...register("id_number", {
                  required: "Por favor llena todos los campos",
                })}
              >
                <ID w={"22"} h={"22"} />
              </Input>
              <Input
                type="text"
                name="bank"
                id="bank"
                placeholder="Banco - 0000"
                register={register}
                error={errors.bank}
                {...register("bank", {
                  required: "Por favor llena todos los campos",
                })}
              >
                <Bank w={"22"} h={"22"} />
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
              
              <Button
                text="Guardar"
                className="text-white w-[80%] mx-auto font-semibold py-2 px-4 rounded-[7px] mt-4 hover:bg-yellow-cake/80 transition-colors duration-200 bg-linear-to-t from-[#794d10] to-[#D46613] stable:text-[1.25rem]"
              />
            </article>
          </form>
        </article>
      </section>
    </>
  );
}
