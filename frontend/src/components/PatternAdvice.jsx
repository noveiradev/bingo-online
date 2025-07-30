export default function PatternAdvice() {
  const id = localStorage.getItem("patternId");
  const name = localStorage.getItem("patternName");
  const pattern = localStorage.getItem("pattern");
  const description = localStorage.getItem("patternDescription");

  return (
    <>
      {id && (
        <section className="absolute bottom-20 w-full p-2 bg-coffee-gray">
          <p className="text-white text-center text-sm">
            El patron seleccionado fue {name}, el cual es {description} {id}
          </p>
        </section>
      )}
    </>
  );
}
