import User from '../models/User.js';
import { hashPassword, comparePassword } from '../config/auth.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({ error: true, message: 'Usuario no encontrado.' }); 
    }

    res.status(200).json({ error: false, user });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: true, message: 'Error interno del servidor.' });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    username,
    password,
    phone,
    security_question,
    security_answer
  } = req.body;

  try {
    const fieldsToUpdate = {};

    if (username) fieldsToUpdate.username = username;
    if (phone) fieldsToUpdate.phone = phone;
    if (security_question) fieldsToUpdate.security_question = security_question;
    if (security_answer) fieldsToUpdate.security_answer = security_answer;
    if (password) {
      const hashed = await hashPassword(password);
      fieldsToUpdate.password = hashed;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(200).json({ error: true, message: "No se proporcionaron datos para actualizar." }); 
    }

    await User.updateById(userId, fieldsToUpdate);

    res.status(200).json({ error: false, message: "Perfil actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error.message);
    res.status(500).json({ error: true, message: "Algo salió mal, por favor intenta más tarde." });
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  if (!password) {
    return res.status(200).json({ success: false, message: 'La contraseña es requerida.' });
  }

  try {
    const user = await User.findByIdWithPassword(userId);

    if (!user) {
      return res.status(200).json({ success: false, message: 'Usuario no encontrado.' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(200).json({ success: false, message: 'Contraseña incorrecta.' });
    }

    const deleted = await User.deleteById(userId);

    if (!deleted) {
      return res.status(500).json({ success: false, message: 'Error al eliminar la cuenta.' });
    }

    return res.status(200).json({ success: true, message: 'Cuenta eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error.message);
    return res.status(500).json({ success: false, message: 'Error del servidor.' });
  }
};
