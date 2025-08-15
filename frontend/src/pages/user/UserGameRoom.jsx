import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@pheralb/toast";
import { io } from "socket.io-client";

import { matchService } from "@/services/api/user/match";
import Logo from "/public/logo.png";
import BingoUserBoard from "@/components/BingoUserBoard";
import NumbersHistory from "@/components/NumbersHistory";
import BINGO_COLUMNS from "@/utils/bingoColumns";
import PatternCard from "@/components/Cards/PatternCard";
import CardboardsPlay from "@/components/CardboardsPlay";

const ALL_NUMBERS_KEY = "game_all_numbers";
const NEWLY_CALLED_KEY = "game_newly_called";
const ACTIVE_NUMBERS_KEY = "game_active_numbers";
const LAST_CALLED_KEY = "game_last_called";
const PATTERN_KEY = "game_pattern";
const GAME_DATA = "game_data";
const CARDS_DATA = "cards_data";

function getLetterForNumber(num) {
  for (const col of BINGO_COLUMNS) {
    const range = col.range;
    if (range && num >= range[0] && num <= range[1]) {
      return col.letter;
    }
  }
  return null;
}

export default function UserGameRoom() {
  const { user } = useAuth();
  const { id } = useParams();
  const socketRef = useRef(null);
  const [haveWinner, setHaveWinner] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [allNumbers, setAllNumbers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ALL_NUMBERS_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [newlyCalled, setNewlyCalled] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(NEWLY_CALLED_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [activeNumbers, setActiveNumbers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ACTIVE_NUMBERS_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [lastCalled, setLastCalled] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(LAST_CALLED_KEY)) || {
          num: null,
          letter: null,
        }
      );
    } catch {
      return { num: null, letter: null };
    }
  });
  const [matchPattern, setMatchPattern] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(PATTERN_KEY)) || [
          { id: null, name: "", description: "", pattern: [] },
        ]
      );
    } catch {
      return [{ id: null, name: "", description: "", pattern: [] }];
    }
  });
  const [gameData, setGameData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(GAME_DATA)) || {};
    } catch {
      return [];
    }
  });

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(ALL_NUMBERS_KEY, JSON.stringify(allNumbers));
  }, [allNumbers]);
  useEffect(() => {
    localStorage.setItem(NEWLY_CALLED_KEY, JSON.stringify(newlyCalled));
  }, [newlyCalled]);
  useEffect(() => {
    localStorage.setItem(ACTIVE_NUMBERS_KEY, JSON.stringify(activeNumbers));
  }, [activeNumbers]);
  useEffect(() => {
    localStorage.setItem(LAST_CALLED_KEY, JSON.stringify(lastCalled));
  }, [lastCalled]);
  useEffect(() => {
    localStorage.setItem(PATTERN_KEY, JSON.stringify(matchPattern));
  }, [matchPattern]);
  useEffect(() => {
    localStorage.setItem(GAME_DATA, JSON.stringify(gameData));
  }, [gameData]);

  // Función que trae info actualizada del match
  const fetchActiveMatch = async () => {
    try {
      const response = await matchService.activeMatch();
      if (response.success) {
        const gameId = response.data.game_id;
        setGameData({ gameId, status: response.data.status });

        let parsedPattern = [];
        try {
          parsedPattern =
            typeof response.data.pattern === "string"
              ? JSON.parse(response.data.pattern)
              : response.data.pattern;
          if (!Array.isArray(parsedPattern)) parsedPattern = [];
        } catch {
          parsedPattern = [];
        }

        setMatchPattern([
          {
            id: response.data.pattern_id,
            name: response.data.pattern_name,
            description: "",
            pattern: parsedPattern,
          },
        ]);

        let parsedCalled = [];
        try {
          parsedCalled = JSON.parse(response.data.called_numbers);
          if (!Array.isArray(parsedCalled)) parsedCalled = [];
        } catch {
          parsedCalled = [];
        }

        const lastNum =
          parsedCalled.length > 0
            ? Number(parsedCalled[parsedCalled.length - 1])
            : null;
        const lastLetter =
          lastNum !== null ? getLetterForNumber(lastNum) : null;

        const newActiveNumbers = {};
        parsedCalled.forEach((n) => {
          newActiveNumbers[String(n)] = true;
        });

        const prevAll = allNumbers.map((n) => String(n));
        const newly = {};
        parsedCalled.forEach((n) => {
          const key = String(n);
          newly[key] = !prevAll.includes(key);
        });

        setAllNumbers(parsedCalled);
        setActiveNumbers(newActiveNumbers);
        setLastCalled({ num: lastNum, letter: lastLetter });
        setNewlyCalled(newly);

        // Conectar socket solo si no está conectado aún
        if (!socketRef.current) {
          initSocket(gameId);
        }
      } else {
        toast.info({
          text: "Selecciona tus cartones para unirte a la partida.",
        });
      }
    } catch (error) {
      console.error("Error fetching active match:", error);
    }
  };

  // Inicializar socket
  const initSocket = (gameId) => {
    if (!gameId || !user?.id) return;

    const socket = io("http://localhost:3000", { transports: ["websocket"] });
    socketRef.current = socket;

    const userId = user.id;

    socket.on("connect", () => {
      socket.emit("joinGame", { gameId, userId });
    });

    socket.on("PLAYER_JOINED", ({ userId: joinedId }) => {
      if (joinedId !== userId) {
        toast.success({ text: `Jugador ${joinedId} se unió a la partida.` });
      }
    });

    socket.on("PLAYER_LEFT", ({ userId: leftId }) => {
      toast.warning({ text: `Jugador ${leftId} salió de la partida.` });
    });

    socket.on("BINGO_WINNER", async (data) => {
      console.log("Bingo winner recibido:", data);
      const cardsData = JSON.parse(localStorage.getItem("cards_data")) || [];
      if (!cardsData.length) {
        console.warn("No hay cartones en localStorage para procesar.");
        toast.warning({ text: "No se encontraron cartones para marcar." });
        return;
      }

      if (data.userId === user.id) {
        setHaveWinner(false);
      } else {
        setHaveWinner(!haveWinner);
        setSecondsLeft(120);
      }
      let markedCount = 0;
      try {
        for (const card of cardsData) {
          if (
            !card.reservationId ||
            !card.gameId ||
            !card.cardId ||
            !card.markedNumbers
          ) {
            console.warn("Cartón incompleto, se omite:", card);
            continue;
          }

          const payload = {
            reservationId: Number(card.reservationId),
            gameId: Number(card.gameId),
            cardId: Number(card.cardId),
            markedNumbers: card.markedNumbers,
          };

          const response = await matchService.markedNumbers(payload);

          if (response?.data) {
            console.log(`Cartón ${card.cardId} marcado correctamente`, payload);
            // eslint-disable-next-line no-unused-vars
            markedCount++;
          } else {
            console.warn(`Error marcando cartón ${card.cardId}`, payload);
          }
        }

        const interval = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setHaveWinner(false);
              localStorage.clear();
              window.location.reload();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

      } catch (error) {
        console.error("Error procesando los cartones:", error);
        toast.error({ text: "Ocurrió un error al marcar los cartones." });
      }
    });

    socket.on("ERROR", ({ message }) => {
      toast.error({ text: message });
      console.error("Server ERROR:", message);
    });

    socket.on("NEW_NUMBER", ({ history }) => {
      setAllNumbers(history);

      const newActiveNumbers = {};
      history.forEach((n) => {
        newActiveNumbers[String(n)] = true;
      });
      setActiveNumbers(newActiveNumbers);

      const lastNum =
        history.length > 0 ? Number(history[history.length - 1]) : null;
      const lastLetter = lastNum !== null ? getLetterForNumber(lastNum) : null;
      setLastCalled({ num: lastNum, letter: lastLetter });

      window.responsiveVoice.speak(
        `${lastLetter} ${lastNum}`,
        "Spanish Latin American Female",
        {
          pitch: 1.1, // (0.5 a 2)
          rate: 1.25, // (0.1 a 1.5)
          volume: 1,
        }
      );

      const prevAll = allNumbers.map((n) => String(n));
      const newNewlyCalled = {};
      history.forEach((n) => {
        const key = String(n);
        newNewlyCalled[key] = !prevAll.includes(key);
      });
      setNewlyCalled(newNewlyCalled);
    });
  };

  useEffect(() => {
    fetchActiveMatch();

    // Cleanup socket
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {haveWinner && (
        <article className="flex justify-center items-center absolute top-0 left-0 w-full h-dvh z-70 bg-black/50">
          <div className="bg-borgon text-gold border-4 border-gold/50 w-[80%] h-[25rem] stable:h-[18rem] p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl mt-4 font-inter font-bold">
              ¡Tenemos un ganador!
            </h2>
            <p className="text-xl mt-4">
              La partida se reanudará pronto, estamos validando el bingo...
            </p>
            <p className="mt-10 text-5xl font-bold font-poppins">
              {Math.floor(secondsLeft / 60)
                .toString()
                .padStart(2, "0")}
              :{(secondsLeft % 60).toString().padStart(2, "0")}
            </p>
          </div>
        </article>
      )}

      <section className="max-w-[768px] mx-auto flex flex-col h-full items-center justify-center relative">
        <section className="grid grid-rows-[auto_1fr] p-2 w-full h-full gap-1">
          <article className="relative rounded-lg h-[21.21rem] overflow-hidden bg-white/10">
            <header className="bg-dark-red/85 h-[1.5rem] grid grid-cols-5">
              {BINGO_COLUMNS.map((col) => (
                <div
                  key={col.letter}
                  className="flex items-center justify-center text-yellow-cake/95 font-bold text-md"
                >
                  {col.letter}
                </div>
              ))}
            </header>
            <BingoUserBoard
              BINGO_COLUMNS={BINGO_COLUMNS}
              newlyCalled={newlyCalled}
              activeNumbers={activeNumbers}
              lastCalled={lastCalled}
            />
          </article>
          <article className="flex gap-[0.35rem] overflow-hidden h-full">
            <div className="bg-[#3C3A3A] overflow-hidden mt-2 rounded-md flex items-center w-full">
              <NumbersHistory allNumbers={allNumbers} viewType={true} />
            </div>
            <div className="bg-[#3C3A3A] mt-2 py-2 rounded-md flex flex-col text-center items-center w-full gap-2">
              <p className="text-dark-gold text-sm font-bold font-inter">
                Modalidad seleccionada
              </p>
              <PatternCard patterns={matchPattern} select={() => {}} />
            </div>
          </article>
        </section>
        <CardboardsPlay roomId={id} updateActiveMatchData={fetchActiveMatch} />
      </section>
    </>
  );
}
