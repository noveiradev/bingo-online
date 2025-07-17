import User from '../models/User.js';
import { hashPassword, comparePassword, signToken } from '../config/auth.js'; 

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      security_question,
      security_answer,
      phone
    } = req.body;

    // Validate required fields
    if (!username || !password || !security_question || !security_answer || !phone) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // check if the user already exists
    const existingUser = await User.findByName(username);
    if (existingUser) {
      return res.status(409).json({ error: 'El nombre de usuario ya está en uso.' });
    }

    const hashedPwd = await hashPassword(password);

    // Create user instance
    const newUser = new User({
      username,
      password: hashedPwd,
      security_question,
      security_answer,
      phone,
    });

    // Save user in the database
    await newUser.save();

    return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ error: 'Nombre y contraseña son obligatorios.' });
    }

    // Seach user by username
    const user = await User.findByName(username);
    if (!user) {
      return res.status(401).json({ error: 'Nombre de usuario no encontrado.' });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Generate JWT token
    const token = signToken(user);

    return res.json({
      message: 'Login exitoso.',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const recoverPassword = async (req, res) => {
  const { username, security_question, security_answer, new_password } = req.body;

  try {
    if (!username || !security_question || !security_answer || !new_password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findByUsernameAndSecurity(username, security_question, security_answer);

    if (!user) {
      return res.status(401).json({ message: 'Security information is incorrect.' });
    }

    const hashedPassword = await hashPassword(new_password);

    await User.updatePassword(user.id, hashedPassword);

    res.status(200).json({ message: 'Password successfully updated.' });
  } catch (error) {
    console.error('Error recovering password:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
