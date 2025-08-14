import Game from '../models/Game.js';
import User from '../models/User.js'; 
import WinningCard from '../models/WinningCard.js';
import { BingoPattern } from '../models/BingoPattern.js';
import { BingoCard } from '../models/BingoCard.js';
import { MarkedNumber } from '../models/MarkedNumber.js'; 
import { getIO } from '../sockets/socket.js';
import { validateCardBingo } from '../utils/bingoValidator.js';

export const validateBingo = async (req, res) => {
  try {
    const { gameId, cardId } = req.body;
    const userId = req.user.id;

    if (!gameId || !cardId) {
      return res.status(200).json({ error: 'Faltan datos necesarios para validar el bingo.' });
    }

    const marked = await MarkedNumber.findByGameAndCard(gameId, cardId);
    if (!marked) {
      console.warn(`No se encontraron números marcados para cardId=${cardId}, gameId=${gameId}`);
      return res.status(200).json({ message: 'No se pudo validar el cartón en esta partida.' });
    }

    let markedNumbers;
    try {
      markedNumbers = Array.isArray(marked.marked_numbers)
        ? marked.marked_numbers
        : JSON.parse(marked.marked_numbers ?? '[]');
    } catch (error) {
      console.error('Error parseando marked.marked_numbers:', error);
      return res.status(500).json({ message: 'Ocurrió un error al validar los números marcados.' });
    }

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'La partida no fue encontrada.' });

    const pattern = await BingoPattern.findById(game.pattern_id);
    if (!pattern) return res.status(404).json({ error: 'No se encontró el patrón de la partida.' });

    const card = await BingoCard.findById(cardId);
    if (!card) return res.status(200).json({ error: 'No se encontró el cartón seleccionado.' });

    const validation = validateCardBingo(game, card, pattern, markedNumbers);
    if (!validation.valid) {
      return res.status(400).json({
        valid: false,
        message: validation.reason
      });
    }

    await Game.updateWinner(gameId, userId);
    await WinningCard.create({
      game_id: gameId,
      card_id: cardId,
      pattern_id: game.pattern_id,
      user_id: userId,
    });

    const winnerUser = await User.findById(userId);
    const io = getIO();
    io.to(`game_${gameId}`).emit('BINGO_WINNER', {
      userId,
      username: winnerUser?.username || null,
      phone: winnerUser?.phone || null,
      gameId,
      message: '¡BINGO! Tenemos un ganador 🎉',
      patternId: game.pattern_id,
      gameStatus: 'finished'
    });

    return res.status(200).json({
      valid: true,
      message: '¡BINGO! Felicitaciones, ganaste la partida.'
    });

  } catch (error) {
    console.error('Error al validar bingo:', error);
    return res.status(500).json({ error: 'Algo salió mal al validar el bingo. Inténtalo de nuevo.' });
  }
};