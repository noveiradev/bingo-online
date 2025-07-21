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
