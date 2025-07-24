import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useAuth } from "@/hooks/useAuth";
import { reservedCards } from "@/services/api/admin/manageCards";
import GoBack from "@/components/GoBack";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Search from "@/icons/Search";
import Accordeon from "@/components/Accordeon";

import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function VerifyCardboard() {
  const { user } = useAuth();
  const [groupedCards, setGroupedCards] = useState({});
  const [filteredCards, setFilteredCards] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const getCardboards = async () => {
    setIsLoading(true);
    try {
      const response = await reservedCards.getCards();

      if (response.success === false) {
        setMessage(
          <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
            No hay cartones reservados en estos momentos
          </p>
        );
        setGroupedCards({});
        setFilteredCards({});
      } else {
        const grouped = response.data.reduce((acc, card) => {
          if (!acc[card.user_id]) {
            acc[card.user_id] = {
              UID: card.user_id,
              username: card.username || `Usuario ${card.user_id}`,
              phone: card.phone || "Sin teléfono",
              cards: [],
            };
          }
          acc[card.user_id].cards.push(card);
          return acc;
        }, {});

        setGroupedCards(grouped);
        setFilteredCards(grouped);
        setMessage(null);
      }
    } catch (error) {
      console.error("Error obteniendo cartones:", error);
      setMessage(
        <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
          Ocurrió un error al cargar los cartones, inténtalo más tarde!
        </p>
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, [1000]);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getCardboards();
    }
  }, [user]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCards(groupedCards);
      setMessage(null);
      return;
    }

    const filtered = Object.entries(groupedCards).reduce(
      (acc, [userId, userData]) => {
        const matchesPhone = userData.phone.includes(searchTerm);
        const matchesName = userData.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        if (matchesPhone || matchesName) {
          acc[userId] = userData;
        }
        return acc;
      },
      {}
    );

    setFilteredCards(filtered);

    if (Object.keys(filtered).length === 0) {
      setMessage(
        <p className="mx-auto w-full text-center text-[#FAF2E7] font-semibold font-poppins">
          No se encontraron resultados para "{searchTerm}"
        </p>
      );
    } else {
      setMessage(null);
    }
  }, [searchTerm, groupedCards]);

  return (
    <section className="max-w-[768px] mx-auto h-full flex flex-col items-center justify-center pt-4">
      <div className="flex w-full max-w-[500px] px-2">
        <GoBack></GoBack>
      </div>
      <h1 className="text-dark-gold font-semibold font-poppins mt-4 text-2xl">
        Validar cartones
      </h1>
      <div className="flex px-2 py-2 gap-2 items-center justify-between h-[3.5rem]">
        <Input
          placeholder="Buscar por teléfono o nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <Search />
        </Input>
        <Button
          text="Actualizar"
          className="bg-green-apple/63 text-white p-2 rounded-lg font-inter text-sm"
          onClick={getCardboards}
        />
      </div>
      <article
        className={`relative flex flex-col gap-1 w-[95%] h-full px-2 py-2 ${
          filteredCards ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Tailspin
              width={40}
              height={40}
              color="#DD8D1B"
              ariaLabel="Cargando..."
            />
          </div>
        ) : message ? (
          message
        ) : Object.keys(filteredCards).length === 0 ? (
          <p className="mt-42 flex items-center mx-auto justify-center w-full text-center text-[#FAF2E7] font-semibold font-poppins">
            No hay cartones reservados en estos momentos
          </p>
        ) : (
          Object.values(filteredCards).map((userData) => (
            <Fade
              direction="up"
              triggerOnce
              cascade
              damping={0.2}
              key={userData.UID}
            >
              <Accordeon
                userID={userData.UID}
                username={userData.username}
                phone={userData.phone}
                cards={userData.cards}
              />
            </Fade>
          ))
        )}
      </article>
    </section>
  );
}
