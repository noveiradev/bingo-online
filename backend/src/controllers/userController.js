import client from '../config/db.js';
import User from '../models/User.js';
import { hashPassword } from '../config/auth.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await client.execute({
      sql: 'SELECT id, username, phone, registration_date, role FROM users WHERE id = ?',
      args: [userId],
    });

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(400).json({ message: "No fields provided for update." });
    }

    await User.updateById(userId, fieldsToUpdate);

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};