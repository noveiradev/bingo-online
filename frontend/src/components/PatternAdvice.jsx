export default function PatternAdvice() {
  const id = localStorage.getItem("patternId");
  const name = localStorage.getItem("patternName");
  const description = localStorage.getItem("patternDescription");

  return (
    <>
      {id && (
        <section className="absolute bottom-0 w-full p-2 bg-coffee-gray">
          <p className="text-white text-center text-sm">
            El patron seleccionado fue {name}, el cual es {description}
          </p>
        </section>
      )}
    </>
  );
}
