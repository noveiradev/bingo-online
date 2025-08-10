import Game  from '../models/Game.js';
import { UserGame } from '../models/UserGame.js';
import { getIO } from '../sockets/socket.js';

export const startGame = async (req, res) => {
  try {
    const { patternId } = req.body;
    if (!patternId) {
      return res.status(200).json({ message: 'Se requiere la modalidad para iniciar la partida' });
    }

    const currentGame = await Game.getCurrentGame();
    if (currentGame) {
      await currentGame.restartGame();
    }

    const newGame = await Game.create(patternId);
    res.status(200).json({
      message: 'Nueva partida creada',
      game: newGame,
    });
  } catch (error) {
    console.error('Error al iniciar nueva partida:', error);
    res.status(500).json({ message: 'Error al iniciar nueva partida' });
  }
};

export const nextNumber = async (req, res) => {
  try {
    const game = await Game.getCurrentGame();
    if (!game) {
      return res.status(404).json({ message: 'No hay una partida activa' });
    }
    if (game.status === 'finished') {
      return res.status(200).json({ message: 'La partida ya terminó' });
    }
    if (game.called_numbers.length >= 75) {
      return res.status(200).json({ message: 'Ya se llamaron todos los números' });
    }

    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(
      (n) => !game.called_numbers.includes(n)
    );

    if (availableNumbers.length === 0) {
      return res.status(200).json({ message: 'No quedan números disponibles' });
    }

    const newNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
    await game.addCalledNumber(newNumber);

    const io = getIO();
    const room = `game_${game.id}`;
    io.to(room).emit('NEW_NUMBER', {
      number: newNumber,
      history: game.called_numbers, 
      pattern: game.pattern_id, 
      status: game.status
    });

    res.status(200).json({
      message: 'Nuevo número generado',
      number: newNumber,
      called_numbers: game.called_numbers,
    });
  } catch (error) {
    console.error('Error al generar número:', error);
    res.status(500).json({ message: 'Error al generar número' });
  }
};

export const getGameHistory = async (req, res) => {
  try {
    const game = await Game.getCurrentGame();
    if (!game) {
      return res.status(200).json({ message: 'No hay partida activa' });
    }
    res.status(200).json({ called_numbers: game.called_numbers });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener historial' });
  }
};

export const restartGame = async (req, res) => {
  try {
    const game = await Game.getCurrentGame();
    if (!game) {
      return res.status(200).json({ message: 'No hay partida activa para reiniciar' });
    }
    await game.restartGame();
    res.status(200).json({ message: 'Partida reiniciada correctamente' });
  } catch (error) {
    console.error('Error al reiniciar partida:', error);
    res.status(500).json({ message: 'Error al reiniciar partida' });
  }
};

export async function getUserActiveGame(req, res) {
  try {
    const userId = req.user.id; 
    const game = await Game.findActiveGameByUserId(userId);

    if (!game) {
      return res.status(200).json({
        success: false,
        message: 'No estás unido a ninguna partida activa'
      });
    }

    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la partida activa'
    });
  }
}

export async function getUsersInGame(req, res) {
  try {
    const { gameId } = req.params;

    if (!gameId) {
      return res.status(200).json({ success: false, message: 'Solicitud inválida. Por favor, verifica los datos e intenta nuevamente.' });
    }

    const users = await UserGame.getUsersByGame(gameId);

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error al obtener usuarios en la partida:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}