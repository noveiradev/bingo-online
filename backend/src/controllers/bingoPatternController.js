import { BingoPattern } from '../models/BingoPattern.js';

export const createPattern = async (req, res) => {
  try {
    const { name, description, pattern } = req.body;

    if (!name || !description || !pattern) {
      return res.status(200).json({ error: 'Todos los campos son obligatorios.' });
    }

    await BingoPattern.create(name, description, pattern);
    res.status(200).json({ message: 'Patrón creado exitosamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal.' });
  }
};

export const getAllPatterns = async (req, res) => {
  try {
    const patterns = await BingoPattern.findAll();
    res.json(patterns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudieron obtener patrones.' });
  }
};

export const deletePattern = async (req, res) => {
  try {
    const { id } = req.params;

    const inUse = await BingoPattern.isPatternInUse(id);
    if (inUse) {
      return res.status(200).json({
        message: 'No se puede eliminar la modalidad porque ha sido usada en una o más partidas.',
      });
    }

    await BingoPattern.deletePattern(id);
    res.status(200).json({ message: 'Modalidad eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar modalidad:', error);
    res.status(500).json({ message: 'Error del servidor al intentar eliminar la modalidad.' });
  }
};