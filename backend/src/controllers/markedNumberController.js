import { MarkedNumber } from '../models/MarkedNumber.js';

export async function getMarkedNumbers(req, res) {
  try {
    const { reservationId } = req.params;
    if (!reservationId) {
      return res.status(400).json({ message: 'Falta reservationId' });
    }
    const marked = await MarkedNumber.findByReservationId(reservationId);
    if (!marked) return res.status(404).json({ message: 'No se encontró registro' });
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

    const updated = await MarkedNumber.upsertMarkedNumbers(reservationId, userId, gameId, cardId, markedNumbers);
    res.json({ message: 'Marcados actualizados', data: updated });
  } catch (error) {
    console.error('Error actualizando números marcados:', error);
    res.status(500).json({ message: 'Error interno' });
  }
}