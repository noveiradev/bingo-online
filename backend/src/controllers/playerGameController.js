import Game from '../models/Game.js';
import WinningCard from '../models/WinningCard.js';
import { BingoPattern } from '../models/BingoPattern.js';
import { BingoCard } from '../models/BingoCard.js';

export const validateBingo = async (req, res) => {
  try {
    const { gameId, userId, cardId, markedNumbers } = req.body;

    if (!gameId || !userId || !cardId || !Array.isArray(markedNumbers)) {
      return res.status(400).json({ error: 'Faltan datos necesarios para validar el bingo.' });
    }

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'La partida no fue encontrada.' });

    let calledNumbers;
    try {
      calledNumbers = Array.isArray(game.called_numbers)
        ? game.called_numbers
        : JSON.parse(game.called_numbers);
    } catch {
      return res.status(500).json({ error: 'Ocurrió un problema al leer los números cantados.' });
    }

    const pattern = await BingoPattern.findById(game.pattern_id);
    if (!pattern) return res.status(404).json({ error: 'No se encontró el patrón de la partida.' });

    if (!pattern.pattern) {
      return res.status(500).json({ error: 'El patrón de bingo no está disponible.' });
    }

    let patternMatrix;
    try {
      patternMatrix = JSON.parse(pattern.pattern);
    } catch {
      return res.status(500).json({ error: 'No se pudo interpretar el patrón de bingo.' });
    }

    const card = await BingoCard.findById(cardId);
    if (!card) return res.status(404).json({ error: 'No se encontró el cartón seleccionado.' });

    if (!card.numbers) {
      return res.status(500).json({ error: 'Los números del cartón no están disponibles.' });
    }

    let cardNumbers;
    try {
      cardNumbers = JSON.parse(card.numbers);
    } catch {
      return res.status(500).json({ error: 'No se pudieron leer los números del cartón.' });
    }

    for (const num of markedNumbers) {
      if (!calledNumbers.includes(num)) {
        return res.status(400).json({
          valid: false,
          message: `El número ${num} que marcaste no ha sido cantado aún.`
        });
      }
    }

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (patternMatrix[row][col] === 1) {
          const index = row * 5 + col;
          const cardNumber = cardNumbers[index];
          if (!markedNumbers.includes(cardNumber)) {
            return res.status(400).json({
              valid: false,
              message: `El patrón no se ha completado con los números marcados.`
            });
          }
        }
      }
    }

    await Game.updateWinner(gameId, userId);

    await WinningCard.create({
      game_id: gameId,
      card_id: cardId,
      pattern_id: game.pattern_id,
      user_id: userId,
    });

    return res.status(200).json({
      valid: true,
      message: '¡BINGO! Felicitaciones, ganaste la partida.'
    });

  } catch (error) {
    return res.status(500).json({ error: 'Algo salió mal al validar el bingo. Inténtalo de nuevo.' });
  }
};
