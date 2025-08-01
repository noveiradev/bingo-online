import GoBack from "@/components/GoBack";
import Logo from "/public/logo.png";
import Button from "@/components/Button";
import PatternCard from "@/components/Cards/PatternCard";
import { useState, useEffect } from "react";
import PatternAdvice from "@/components/PatternAdvice";
import { toast } from "@pheralb/toast";
import BingoBoard from "@/components/BingoBoard";
import NumbersHistory from "@/components/NumbersHistory";
import { obtainAllPatterns } from "@/services/api/patterns";
import { startGame, boardNumbers } from "@/services/api/admin/liveMatch";
import CleanModal from "@/components/CleanModal";
import BingoBall from "@/components/BingoBall";

export default function GameRoom() {
  const [cleanModal, setCleanModal] = useState(false);

  const getLocalStorage = (key, fallback) => {
    if (typeof window === "undefined") return fallback;
    const stored = localStorage.getItem(key);
    try {
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  // Estados inicializados desde localStorage
  const [activeNumbers, setActiveNumbers] = useState(() =>
    getLocalStorage("activeNumbers", {})
  );
  const [newlyCalled, setNewlyCalled] = useState(() =>
    getLocalStorage("newlyCalled", {})
  );
  const [lastCalled, setLastCalled] = useState(() =>
    getLocalStorage("lastCalled", { num: "?", letter: "" })
  );
  const [allNumbers, setAllNumbers] = useState(() =>
    getLocalStorage("allNumbers", [])
  );
  const [matchState, setMatchState] = useState(() =>
    getLocalStorage("matchState", false)
  );
  const [patternSelected, setPatternSelected] = useState(() =>
    getLocalStorage("patternSelected", false)
  );

  const [bCalls] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  const [iCalls] = useState([
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]);
  const [nCalls] = useState([
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
  ]);
  const [gCalls] = useState([
    46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  ]);
  const [oCalls] = useState([
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  ]);

  const [patterns, setPatterns] = useState("");
  const [modalPattern, setModalPattern] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BINGO_COLUMNS = [
    { letter: "B", range: [1, 15], calls: bCalls, color: "bg-simple-gold/20" },
    { letter: "I", range: [16, 30], calls: iCalls, color: "bg-simple-gold/20" },
    { letter: "N", range: [31, 45], calls: nCalls, color: "bg-simple-gold/20" },
    { letter: "G", range: [46, 60], calls: gCalls, color: "bg-simple-gold/20" },
    { letter: "O", range: [61, 75], calls: oCalls, color: "bg-simple-gold/20" },
  ];

  const toggleNumber = (number) => {
    const isCurrentlyActive = activeNumbers[number];

    if (!isCurrentlyActive) {
      const column = BINGO_COLUMNS.find(
        (col) => number >= col.range[0] && number <= col.range[1]
      );
      const letter = column?.letter || "";

      setNewlyCalled((prev) => ({ ...prev, [number]: true }));
      setLastCalled({ num: number, letter });
      setAllNumbers((prev) => [...prev, number]);

      setTimeout(() => {
        setNewlyCalled((prev) => ({ ...prev, [number]: false }));
      }, 2000);
    }

    setActiveNumbers((prev) => ({ ...prev, [number]: !prev[number] }));
  };

  const [canCallNext, setCanCallNext] = useState(true);

  const callNextNumber = async () => {
    if (!canCallNext) return;
    setCanCallNext(false);
    try {
      const response = await boardNumbers.next();

      if (response.message === "Ya se llamaron todos los números") {
        toast.error({
          text: "Ya se han llamado todos los números, limpia el tablero para empezar una nueva partida.",
        });

        return;
      } else {
        toggleNumber(response.number);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setTimeout(() => {
        setCanCallNext(true);
      }, 800);
    }
  };

  const startMatch = async () => {
    setIsLoading(true);
    setPatternSelected(true);
    const matchData = {
      patternId: Number(localStorage.getItem("patternId")),
    };
    try {
      const response = await startGame.start(matchData);
      if (
        response.message == "Se requiere la modalidad para iniciar la partida"
      ) {
        toast.error({
          text: "Debes seleccionar una modalidad para iniciar la partida",
        });
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        setMatchState(true);
        localStorage.setItem("matchState", true);

        toast.success({
          text: "Partida iniciada correctamente",
        });
        localStorage.setItem("matchData", JSON.stringify(response.game));
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const clearBoard = async () => {
    setActiveNumbers({});
    setNewlyCalled({});
    setLastCalled({ num: "?", color: "" });
    setAllNumbers([]);
    setMatchState(false);

    localStorage.removeItem("activeNumbers");
    localStorage.removeItem("newlyCalled");
    localStorage.setItem("lastCalled", JSON.stringify({ num: "?", color: "" }));
    localStorage.removeItem("allNumbers");
    localStorage.removeItem("matchButton");
    localStorage.removeItem("matchData");
    localStorage.setItem("matchState", false);

    // Pattern data delete
    localStorage.removeItem("patternId");
    localStorage.removeItem("pattern");
    localStorage.removeItem("patternName");
    localStorage.removeItem("patternDescription");

    toast.success({
      text: "Tablero limpiado correctamente",
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const patternModal = () => {
    setModalPattern(!modalPattern);
  };

  const getPatterns = async () => {
    setIsLoading(true);
    try {
      const response = await obtainAllPatterns.get();
      if (response) {
        setPatterns(response);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const selectPattern = (pattern, name, description, id) => {
    localStorage.setItem("patternId", id);
    localStorage.setItem("pattern", JSON.stringify(pattern));
    localStorage.setItem("patternName", name);
    localStorage.setItem("patternDescription", description);

    setModalPattern(!modalPattern);
  };

  useEffect(() => {
    localStorage.setItem("activeNumbers", JSON.stringify(activeNumbers));
  }, [activeNumbers]);

  useEffect(() => {
    localStorage.setItem("newlyCalled", JSON.stringify(newlyCalled));
  }, [newlyCalled]);

  useEffect(() => {
    localStorage.setItem("lastCalled", JSON.stringify(lastCalled));
  }, [lastCalled]);

  useEffect(() => {
    localStorage.setItem("allNumbers", JSON.stringify(allNumbers));
  }, [allNumbers]);

  useEffect(() => {
    getPatterns();
  }, []);

  return (
    <>
      {modalPattern && (
        <article
          className="absolute top-0 left-0 z-30 w-full h-dvh bg-[#000]/85 flex items-center justify-center px-4"
          onClick={() => {
            setModalPattern(!modalPattern);
          }}
        >
          <div className="flex flex-wrap justify-center items-center w-full h-[45rem] gap-2 bg-carbon-gray px-6 py-20 rounded-2xl overflow-auto relative">
            <h2 className="absolute top-0 left-0 text-center w-full text-sm px-10 py-4 text-white font-inter">
              Selecciona una modalidad para tu partida
            </h2>
            <PatternCard patterns={patterns} select={selectPattern} />
          </div>
        </article>
      )}

      {cleanModal && (
        <CleanModal
          showModal={setCleanModal}
          modalState={cleanModal}
          clearBoard={clearBoard}
        />
      )}

      <section className="max-w-[768px] mx-auto flex flex-col h-full items-center justify-center pt-4">
        <section className="grid grid-cols-2 md:grid-cols-2 p-2 w-full h-full gap-2">
          <article className="flex flex-col items-center">
            <div className="w-full p-1 flex flex-col items-center rounded-xl">
              <img
                src={Logo}
                alt="Bingo risas y cartones logo"
                className="size-[8.1rem] mb-4 drop-shadow-[0_0_10px_rgba(83,63,27,0.70)]"
              />

              <div className="w-full">
                <Button
                  text="Seleccionar modalidad"
                  className="bg-dark-gold w-full text-xs px-2 py-3 rounded-md text-white font-medium cursor-pointer hover:bg-dark-gold/80 transition-colors"
                  onClick={() => {
                    patternSelected
                      ? toast.error({
                          text: "Ya iniciaste una partida, no puedes cambiar la modalidad hasta terminarla.",
                        })
                      : patternModal();
                  }}
                />
              </div>
            </div>

            <div className="bg-blue-gray w-full p-3 mt-2 flex flex-col gap-3 items-center rounded-xl">
              <BingoBall lastCalled={lastCalled}/>
              {!matchState && (
                <Button
                  text="Iniciar partida"
                  onClick={() => {
                    startMatch();
                  }}
                  className={`bg-[#FFFEFD] px-2 py-2 w-full text-xs rounded-md text-[#272624] font-medium font-inter cursor-pointer hover:bg-[#FFFEFD]/80 transition-colors`}
                />
              )}

              {matchState && (
                <Button
                  text="Siguiente número"
                  className={`${
                    canCallNext
                      ? "bg-[#FFFEFD]"
                      : "bg-[#FFFEFD]/50 cursor-not-allowed"
                  }  px-2 py-2 w-full text-xs rounded-md text-[#272624] font-medium font-inter cursor-pointer hover:bg-[#FFFEFD]/80 transition-colors`}
                  onClick={callNextNumber}
                />
              )}
            </div>
            <Button
              text="Reiniciar partida"
              className="bg-yellow-cake/28 text-white px-2 py-2 w-full rounded-md mt-2 text-sm cursor-pointer hover:bg-yellow-cake/50 transition-colors font-medium font-inter"
              onClick={() => {
                setCleanModal(!cleanModal);
              }}
            />
            <NumbersHistory allNumbers={allNumbers} />
          </article>

          {/* Second column */}
          <article className="relative rounded-lg h-[33.5rem] overflow-hidden bg-white/10">
            <header className="bg-dark-red/85 h-[2rem] grid grid-cols-5">
              {BINGO_COLUMNS.map((col) => (
                <div
                  key={col.letter}
                  className={`flex items-center justify-center text-yellow-cake/95 font-bold text-xl`}
                >
                  {col.letter}
                </div>
              ))}
            </header>

            <BingoBoard
              BINGO_COLUMNS={BINGO_COLUMNS}
              newlyCalled={newlyCalled}
              activeNumbers={activeNumbers}
              lastCalled={lastCalled}
            />
          </article>
        </section>
        <PatternAdvice></PatternAdvice>
      </section>
    </>
  );
}
