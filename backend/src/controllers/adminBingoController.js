import { BingoCard } from '../models/BingoCard.js';

export const getReservedCards = async (req, res) => {
  try {
    const { rows } = await BingoCard.findReservedCards();

    if (rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No hay cartones reservados actualmente.',
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cartones reservados encontrados.',
      data: rows
    });
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

export const approveReservationWithBonus = async (req, res) => {
  const { cardId, userId } = req.body;

  try {
    const result = await BingoCard.approveReservation(cardId, userId);

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: 'Reservation not found or already approved.' });
    }

    const paidCountResult = await BingoCard.countPaidReservationsByUser(userId);
    const paidCount = paidCountResult.rows[0]?.count || 0;

    if (paidCount % 3 === 0) {
      const bonusResult = await BingoCard.assignFreeCardToUser(userId);

      if (bonusResult.rowsAffected > 0) {
        return res.status(200).json({ 
          message: 'Reservation approved and bonus card assigned!',
          bonusGranted: true
        });
      } else {
        return res.status(200).json({ 
          message: 'Reservation approved, but no bonus card available.',
          bonusGranted: false
        });
      }
    }

    return res.status(200).json({ 
      message: 'Reservation approved.',
      bonusGranted: false 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
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
