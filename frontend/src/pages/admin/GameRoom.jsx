import { useState, useEffect, useRef } from "react";
import { toast } from "@pheralb/toast";
import { useAuth } from "@/hooks/useAuth";

import EmptyCardboard from "@/assets/images/Carton-vacio.webp";

import GoBack from "@/components/GoBack";
import Button from "@/components/Button";
import PatternCard from "@/components/Cards/PatternCard";
import PatternAdvice from "@/components/PatternAdvice";
import BingoBoard from "@/components/BingoBoard";
import NumbersHistory from "@/components/NumbersHistory";
import CleanModal from "@/components/CleanModal";
import BingoBall from "@/components/BingoBall";
import PlayersInMatch from "@/components/PlayersInMatch";

import BINGO_COLUMNS from "@/utils/bingoColumns";

import { obtainAllPatterns } from "@/services/api/patterns";
import { cardById } from "@/services/api/cards";
import {
  startGame,
  boardNumbers,
  possibleWinners,
  restartMatch,
} from "@/services/api/admin/liveMatch";

import Logo from "/public/logo.png";

import { io } from "socket.io-client";

export default function GameRoom() {
  const { user } = useAuth();
  const userId = user.id;
  const socketRef = useRef(null);

  const [gameId, setGameId] = useState(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("gameId") || null;
    return null;
  });
  const [bingoWinner, setBingoWinner] = useState("");
  const [possibleWinnersContent, setPossibleWinnersContent] = useState([]);
  const [showPossibleWinners, setShowPossibleWinners] = useState(false);

  const [activeNumbers, setActiveNumbers] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("activeNumbers")
      ? JSON.parse(localStorage.getItem("activeNumbers"))
      : {}
  );
  const [newlyCalled, setNewlyCalled] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("newlyCalled")
      ? JSON.parse(localStorage.getItem("newlyCalled"))
      : {}
  );
  const [lastCalled, setLastCalled] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("lastCalled")
      ? JSON.parse(localStorage.getItem("lastCalled"))
      : { num: "?", letter: "" }
  );
  const [allNumbers, setAllNumbers] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("allNumbers")
      ? JSON.parse(localStorage.getItem("allNumbers"))
      : []
  );
  const [matchState, setMatchState] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("matchState")
      ? JSON.parse(localStorage.getItem("matchState"))
      : false
  );
  const [patternSelected, setPatternSelected] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("patternSelected")
      ? JSON.parse(localStorage.getItem("patternSelected"))
      : false
  );

  const [cleanModal, setCleanModal] = useState(false);
  const [playersMatch, setPlayersMatch] = useState(false);
  const [patterns, setPatterns] = useState("");
  const [modalPattern, setModalPattern] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canCallNext, setCanCallNext] = useState(true);

  useEffect(() => {
    localStorage.setItem("activeNumbers", JSON.stringify(activeNumbers));
    localStorage.setItem("newlyCalled", JSON.stringify(newlyCalled));
    localStorage.setItem("lastCalled", JSON.stringify(lastCalled));
    localStorage.setItem("allNumbers", JSON.stringify(allNumbers));
    localStorage.setItem("matchState", JSON.stringify(matchState));
    localStorage.setItem("patternSelected", JSON.stringify(patternSelected));
    if (gameId) localStorage.setItem("gameId", gameId);
  }, [
    activeNumbers,
    newlyCalled,
    lastCalled,
    allNumbers,
    matchState,
    patternSelected,
    gameId,
  ]);

  useEffect(() => {
    const socket = io("https://bingo-online-c97r.onrender.com/", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      if (gameId) {
        socket.emit("joinGame", { gameId, userId });
      }
    });

    socket.on("BINGO_WINNER", (data) => {
      if (data.message) {
        toast.info({
          text: `¡${data.message} La partida se reiniciará en breve.`,
        });
        setBingoWinner(data);
      }
    });
  }, [userId, gameId]);

  const handleEmit = async (gameId, userId) => {
    try {
      const response = await restartMatch.restart();

      if (response) {
        if (socketRef.current) {
          socketRef.current.emit("resetBoard", {
            gameId,
            userId,
            message: "La partida fue reiniciada",
          });
        }
      } else {
        console.error("No se pudo reiniciar la partida");
      }
    } catch (err) {
      console.error("Error al reiniciar la partida:", err);
    }
  };

  const resetStates = () => {
    setActiveNumbers({});
    setNewlyCalled({});
    setLastCalled({ num: "?", letter: "" });
    setAllNumbers([]);
    setMatchState(false);
    setPatternSelected(false);
    setGameId(null);
    setBingoWinner("");

    localStorage.removeItem("activeNumbers");
    localStorage.removeItem("newlyCalled");
    localStorage.removeItem("lastCalled");
    localStorage.removeItem("allNumbers");
    localStorage.removeItem("matchState");
    localStorage.removeItem("patternSelected");
    localStorage.removeItem("gameId");

    localStorage.removeItem("patternId");
    localStorage.removeItem("pattern");
    localStorage.removeItem("patternName");
    localStorage.removeItem("patternDescription");
  };

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
    const patternId = localStorage.getItem("patternId");
    if (!patternId) {
      toast.error({
        text: "Debes seleccionar una modalidad para iniciar la partida",
      });
      setIsLoading(false);
      setPatternSelected(false);
      return;
    }
    const matchData = {
      patternId: Number(patternId),
    };
    try {
      const response = await startGame.start(matchData);
      if (
        response.message === "Se requiere la modalidad para iniciar la partida"
      ) {
        toast.error({
          text: "Debes seleccionar una modalidad para iniciar la partida",
        });
        setIsLoading(false);
        setPatternSelected(false);
        return;
      } else {
        setIsLoading(false);
        setMatchState(true);
        toast.success({
          text: "Partida iniciada correctamente",
        });
        setGameId(response.game.id);
        localStorage.setItem("matchData", JSON.stringify(response.game));
      }
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
      setPatternSelected(false);
    }
  };

  const clearBoard = () => {
    resetStates();

    toast.success({
      text: "Tablero limpiado correctamente",
    });
    handleEmit(gameId, userId);
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

    setModalPattern(false);
  };

  useEffect(() => {
    getPatterns();
  }, []);

  const handlePossibleWinners = async () => {
    try {
      const response = await possibleWinners.get({ gameId });

      if (!response || response === false) {
        setShowPossibleWinners(false);
        setPossibleWinnersContent([]);
        return;
      }

      const filteredResponse = bingoWinner
        ? response.filter((res) => res.user_id !== bingoWinner.userId)
        : response;

      const responseWithCards = await Promise.all(
        filteredResponse.map(async (res) => {
          const cardData = await cardById.cardById(Number(res.card_id));
          return {
            ...res,
            cardInfo: cardData,
          };
        })
      );

      setPossibleWinnersContent(responseWithCards);
    } catch (error) {
      console.error("Error handlePossibleWinners function: ", error);
    }
  };

  return (
    <>
      {bingoWinner && (
        <section className="absolute top-0 left-0 z-30 w-full h-dvh bg-[#000]/85 flex items-center justify-center px-4">
          <article className="flex max-w-[450px] flex-col items-center w-full h-[35rem] stable:h-[29rem] gap-2 bg-borgon p-4 rounded-2xl overflow-auto relative text-gold border-4 border-gold/50">
            <button
              className="absolute top-2 right-2 text-white bg-red-400 rounded-full w-6 h-auto flex items-center justify-center font-bold hover:bg-red-500 transition-colors"
              onClick={() => setBingoWinner("")}
            >
              ✕
            </button>

            {showPossibleWinners && possibleWinnersContent.length > 0 ? (
              <>
                <h2 className="text-gold text-[1.25rem] font-inter font-bold">
                  Posibles ganadores
                </h2>
                <article className="text-lg w-full h-full text-yellow-cake flex flex-col gap-2 rounded bg-coral-red/50 p-2 overflow-auto">
                  {possibleWinnersContent.map((winner, i) => (
                    <div
                      key={i}
                      className="bg-borgon/40 outline-2 outline-gold/30 rounded p-2 text-sm flex flex-col gap-2 justify-center"
                    >
                      <div>
                        <p className="mb-2 font-bold">
                          Partida #{winner.game_id}
                        </p>
                        <p>Nombre de usuario: {winner.username}</p>
                        <p>Número de teléfono: {winner.phone}</p>
                        <p>Cartón: {winner.card_id}</p>
                        <p>
                          Hora:{" "}
                          {winner.created_at &&
                            new Date(winner.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </p>
                      </div>

                      <div className="grid grid-cols-5 grid-rows-5 w-[112px] h-[140px] px-[0.6rem] pb-[1rem] relative pt-[1.85rem] items-center justify-items-center self-center">
                        {JSON.parse(winner.cardInfo.data.numbers).map(
                          (number, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-center text-xs font-bold z-10 text-black"
                            >
                              {number === "free" ? (
                                <span className="text-[8px]"></span>
                              ) : (
                                number
                              )}
                            </div>
                          )
                        )}
                        <img
                          src={EmptyCardboard}
                          alt="Bingo cardboard"
                          className="w-30 h-auto absolute"
                        />
                      </div>
                    </div>
                  ))}
                </article>
              </>
            ) : (
              <>
                <div className="text-center w-full">
                  <h2 className="text-gold text-[2.3rem] font-inter font-bold mt-4">
                    {bingoWinner?.message?.split(" ")[0]}
                  </h2>
                  <h3 className="text-gold text-[1.75rem] font-inter font-bold">
                    {bingoWinner?.message?.slice(8)}
                  </h3>
                </div>
                <div className="text-lg w-full h-full text-yellow-cake flex flex-col gap-2 justify-center rounded bg-coral-red/50 px-4 py-2">
                  <p className="font-poppins font-medium">
                    Usuario ganador:{" "}
                    <span className="px-1 outline-2 rounded">
                      {bingoWinner?.username}
                    </span>
                  </p>
                  <p className="font-poppins font-medium">
                    Número de teléfono:{" "}
                    <span className="px-1 outline-2 rounded">
                      {bingoWinner?.phone}
                    </span>
                  </p>
                  <p className="font-poppins font-medium">
                    Estado de la partida:{" "}
                    <span className="px-1 outline-2 rounded">
                      {bingoWinner?.gameStatus === "finished"
                        ? "Finalizado"
                        : "En curso"}
                    </span>
                  </p>
                  <p className="font-poppins font-medium">
                    Número de la partida ganada:{" "}
                    <span className="px-1 outline-2 rounded">
                      #{bingoWinner?.gameId}
                    </span>
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-2 w-full h-[4rem]">
              <Button
                text="Volver"
                className="w-1/2 bg-[#44728E] text-white px-2 py-3 rounded text-sm"
                onClick={() => setShowPossibleWinners(false)}
              />
              <Button
                text={"Posibles ganadores"}
                className="w-full px-2 py-3 bg-militar-green rounded text-white text-sm"
                onClick={async () => {
                  setShowPossibleWinners(true);

                  if (possibleWinnersContent.length === 0) {
                    await handlePossibleWinners();
                  }
                }}
              />
            </div>
          </article>
        </section>
      )}

      {modalPattern && (
        <article
          className="absolute top-0 left-0 z-30 w-full h-dvh bg-[#000]/85 flex items-center justify-center px-4"
          onClick={() => {
            setModalPattern(!modalPattern);
          }}
        >
          <div className="flex flex-wrap justify-center items-center w-[30rem] h-[35rem] gap-2 bg-carbon-gray px-6 py-20 rounded-2xl overflow-auto relative border-4 border-gold/30">
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

      <section className="max-w-[600px] mx-auto flex flex-col h-full items-center justify-center relative py-4 overflow-auto">
        <div className="flex w-full max-w-[600px] px-2 pb-3">
          <GoBack viewType={false} />
        </div>
        <section className="grid grid-cols-2 md:grid-cols-2 p-2 w-full h-full gap-2">
          <article className="flex flex-col items-center">
            <div className="w-full p-1 flex flex-col items-center rounded-xl">
              <img
                src={Logo}
                alt="Bingo risas y cartones logo"
                className="size-[7.95rem] desk:size-[6rem] desklg:size-[8rem] mb-1 drop-shadow-[0_0_10px_rgba(83,63,27,0.70)]"
              />

              <div className="w-full">
                <Button
                  text="Seleccionar modalidad"
                  className="bg-dark-gold w-full text-xs px-2 py-3 rounded-md text-white font-medium cursor-pointer hover:bg-dark-gold/80 transition-colors desk:py-1 desklg:py-3"
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

            <div className="bg-blue-gray w-full p-3 mt-1 flex flex-col gap-2 items-center rounded-xl desk:p-2 desk:gap-1 desklg:gap-2 desklg:p-3">
              <BingoBall lastCalled={lastCalled} />
              {!matchState && (
                <Button
                  text="Iniciar partida"
                  onClick={() => {
                    startMatch();
                  }}
                  className={`bg-[#FFFEFD] p-2 desk:p-1 desklg:p-2 w-full text-xs rounded-md text-[#272624] font-medium font-inter cursor-pointer hover:bg-[#FFFEFD]/80 transition-colors`}
                />
              )}

              {matchState && (
                <Button
                  text="Siguiente número"
                  className={`${
                    canCallNext
                      ? "bg-[#FFFEFD] cursor-pointer"
                      : "bg-[#FFFEFD]/35 cursor-not-allowed"
                  }  p-2 w-full text-xs rounded-md text-[#272624] font-medium font-inter transition-colors desk:p-1 desklg:p-2`}
                  onClick={callNextNumber}
                />
              )}
            </div>
            <Button
              text="Reiniciar partida"
              className="bg-yellow-cake/28 text-white p-2 desk:p-1 desk:mt-1 desklg:p-2 desklg:mt-2 w-full rounded-md mt-2 text-sm desk:text-xs cursor-pointer hover:bg-yellow-cake/50 transition-colors font-medium font-inter"
              onClick={() => {
                setCleanModal(!cleanModal);
              }}
            />
            <NumbersHistory allNumbers={allNumbers} />
          </article>

          {/* Second column */}
          <article className="relative rounded-lg h-[31.25rem] desk:h-[25.5rem] desklg:h-[30.15rem] overflow-hidden bg-white/10">
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
        {playersMatch ? (
          <PlayersInMatch view={playersMatch} setView={setPlayersMatch} />
        ) : (
          <Button
            text="Ver jugadores en la partida"
            className="text-white absolute top-1 desk:h-[1.5rem] desk:px-2 desk:py-0 text-sm py-[0.10rem] px-4 bg-blue-gray rounded-lg shadow-lg cursor-pointer"
            onClick={() => {
              setPlayersMatch(!playersMatch);
            }}
          />
        )}
        <PatternAdvice></PatternAdvice>
      </section>
    </>
  );
}
