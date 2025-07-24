import { SelectedCard } from '../models/SelectedCard.js';
import { BingoCard } from '../models/BingoCard.js';

export async function assignSelectedCards(req, res) {
  try {
    const userId = req.user.id;
    const { gameId, reservationIds } = req.body;

    for (const reservationId of reservationIds) {
      const isValid = await BingoCard.validatePaidReservation(reservationId, userId);
      if (!isValid) {
        return res.status(400).json({ message: `Reserva inválida o no disponible: ${reservationId}` });
      }
    }

    await SelectedCard.assignCardsToGame(gameId, reservationIds);

    res.status(200).json({ message: 'Cartones seleccionados para la partida correctamente.' });
  } catch (error) {
    console.error('Error asignando cartones seleccionados:', error);
    res.status(500).json({ message: 'Error al asignar cartones.' });
  }
}