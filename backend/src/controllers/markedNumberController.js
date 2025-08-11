import { MarkedNumber } from '../models/MarkedNumber.js';

export async function getMarkedNumbers(req, res) {
  try {
    const { reservationId, gameId, cardId } = req.params;

    if (!reservationId || !gameId || !cardId) {
      return res.status(400).json({ message: 'Faltan parámetros: reservationId, gameId o cardId' });
    }

    const marked = await MarkedNumber.findByReservationGameAndCard(
      Number(reservationId),
      Number(gameId),
      Number(cardId)
    );

    if (!marked) {
      return res.status(404).json({ message: 'No se encontró registro para esta partida y cartón' });
    }

    res.json(marked);
  } catch (error) {
    console.error('Error obteniendo números marcados:', error);
    res.status(500).json({ message: 'Error interno' });
  }
}

export async function updateMarkedNumbers(req, res) {
  try {
    const { reservationId, gameId, cardId, markedNumbers } = req.body;
    const userId = req.user?.id;

    if (
      typeof reservationId !== 'number' ||
      typeof userId !== 'number' ||
      typeof gameId !== 'number' ||
      typeof cardId !== 'number' ||
      !Array.isArray(markedNumbers)
    ) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    const updated = await MarkedNumber.upsertMarkedNumbers(
      reservationId,
      userId,
      gameId,
      cardId,
      markedNumbers
    );

    res.json({ message: 'Marcados actualizados', data: updated });
  } catch (error) {
    console.error('Error actualizando números marcados:', error);
    res.status(500).json({ message: 'Error interno' });
  }
}