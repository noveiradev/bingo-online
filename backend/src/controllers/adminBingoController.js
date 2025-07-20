import { BingoCard } from '../models/BingoCard.js';

export const getReservedCards = async (req, res) => {
  try {
    const { rows } = await BingoCard.findReservedCards();
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener cartones reservados:', err);
    res.status(500).json({ message: 'Error al obtener cartones reservados.' });
  }
};

export const approveReservation = async (req, res) => {
  try {
    const { cardId, userId } = req.body;
    const { rowsAffected } = await BingoCard.approveReservation(cardId, userId);

    if (rowsAffected === 0) {
      return res.status(200).json({ success: false, message: 'No se pudo aprobar la reserva. Verifica los datos.' });
    }

    res.json({ message: 'Reserva aprobada exitosamente.' });
  } catch (err) {
    console.error('Error al aprobar reserva:', err);
    res.status(500).json({ message: 'Error al aprobar reserva.' });
  }
};

export const rejectReservation = async (req, res) => {
  try {
    const { cardId, userId } = req.body;
    const { rowsAffected } = await BingoCard.rejectReservation(cardId, userId);

    if (rowsAffected === 0) {
      return res.status(200).json({ success: false, message: 'No se pudo rechazar la reserva. Verifica los datos.' });
    }

    res.json({ message: 'Reserva rechazada y cartón liberado exitosamente.' });
  } catch (err) {
    console.error('Error al rechazar reserva:', err);
    res.status(500).json({ message: 'Error al rechazar reserva.' });
  }
};
