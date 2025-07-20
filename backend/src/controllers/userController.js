import User from '../models/User.js';
import { hashPassword } from '../config/auth.js';

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