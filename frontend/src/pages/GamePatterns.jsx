import GoBack from "@/components/GoBack";

export default function GamePatterns() {
  return (
    <>
      <section className="max-w-[768px] mx-auto flex flex-col h-full items-center justify-center pt-4">
        <div className="flex w-full max-w-[500px] px-2">
          <GoBack></GoBack>
        </div>
        <h1 className="text-dark-gold font-semibold font-poppins text-2xl mb-2">
          Modalidades
        </h1>
        <article className="bg-white/5 w-[95%] h-full border-2 border-gradient-rounded px-8 py-4 overflow-hidden"></article>
      </section>
    </>
  );
}
