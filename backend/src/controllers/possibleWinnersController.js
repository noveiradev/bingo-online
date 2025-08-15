import Game from '../models/Game.js';
import PossibleWinner from '../models/PossibleWinner.js';
import { BingoPattern } from '../models/BingoPattern.js';
import { BingoCard } from '../models/BingoCard.js';
import { MarkedNumber } from '../models/MarkedNumber.js';
import { validateCardBingo } from '../utils/bingoValidator.js';

export const findPossibleWinners = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Partida no encontrada.' });

    const pattern = await BingoPattern.findById(game.pattern_id);
    if (!pattern) return res.status(404).json({ error: 'Patrón no encontrado.' });

    const markedList = await MarkedNumber.findAllByGame(gameId);
    if (!Array.isArray(markedList)) {
      return res.status(500).json({ error: 'Error en los datos de marcados.' });
    }

    for (const marked of markedList) {
      const alreadyWon = await PossibleWinner.exists(gameId, marked.user_id, marked.card_id);
      if (alreadyWon) continue;

      const card = await BingoCard.findById(marked.card_id);
      if (!card) continue;

      let markedNumbers = [];
      try {
        markedNumbers = Array.isArray(marked.marked_numbers)
          ? marked.marked_numbers
          : JSON.parse(marked.marked_numbers ?? '[]');
      } catch {
        markedNumbers = [];
      }

      const validation = validateCardBingo(game, card, pattern, markedNumbers);
      if (!validation.valid) continue;

      await PossibleWinner.create({
        game_id: gameId,
        user_id: marked.user_id,
        card_id: marked.card_id,
        pattern_id: pattern.id
      });
    }

    const winnersWithInfo = await PossibleWinner.findAllByGame(gameId);

    return res.status(200).json(winnersWithInfo);

  } catch (error) {
    console.error('Error buscando posibles ganadores:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};