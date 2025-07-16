import client from '../config/db.js';

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
