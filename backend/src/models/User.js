import client from '../config/db.js';
class User {
  constructor({ id, username, password, security_question, security_answer, phone, registration_date, role }) {
    this.id = id;
    this.username = username;
    this.password = password; 
    this.security_question = security_question;
    this.security_answer = security_answer;
    this.phone = phone;
    this.registration_date = registration_date;
    this.role = role;
  }

  // Find user by ID
  static async findById(id) {
    const result = await client.execute({
      sql: 'SELECT id, username, phone, registration_date, role FROM users WHERE id = ?',
      args: [id],
    });

    if (result.rows.length === 0) return null;

    return new User(result.rows[0]);
  }

  // Find user by username
  static async findByName(username) {
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [username],
    });
    if (result.rows.length === 0) return null;

    // Convert the first row to a User instance
    return new User(result.rows[0]);
  }

  // Find user by username and security question/answer
  static async findByUsernameAndSecurity(username, question, answer) {
    const result = await client.execute({
      sql: `
        SELECT * FROM users
        WHERE username = ? AND security_question = ? AND security_answer = ?
      `,
      args: [username, question, answer],
    });

    return result.rows[0]; // return user if found, otherwise undefined
  }

  // Find user by ID with password (for authentication)
  static async findByIdWithPassword(id) {
    try {
      const sql = 'SELECT id, password FROM users WHERE id = ?';
      const { rows } = await client.execute({ sql, args: [id] });

      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario con contraseña:', error.message);
      throw error;
    }
  }

  // Update user by ID
  static async updateById(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

  if (keys.length === 0) {
    throw new Error("No fields to update.");
  }

  // Created a dynamic SQL update statement
  const setClause = keys.map(key => `${key} = ?`).join(', ');

  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

  try {
    await client.execute({
      sql,
      args: [...values, id],
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    throw error;
  }
}

  // Update user password
  static async updatePassword(id, newPassword) {
    await client.execute({
      sql: `
        UPDATE users SET password = ?
        WHERE id = ?
      `,
      args: [newPassword, id],
    });
  }

  // Delete user by ID
  static async deleteById(id) {
    try {
      const sql = 'DELETE FROM users WHERE id = ?';
      await client.execute({ sql, args: [id] });
      return true;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      throw error;
    }
  }

  // Save new user to the database
  async save() {
    await client.execute({
      sql: `
        INSERT INTO users (username, password, security_question, security_answer, phone)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        this.username,
        this.password,
        this.security_question,
        this.security_answer,
        this.phone
      ],
    });
  }

  // Get all players with wins
  static async getPlayersWithWins() {
  const sql = `
    SELECT 
      u.id,
      u.username,
      u.phone,
      COUNT(g.id) AS wins
    FROM users u
    LEFT JOIN games g ON g.winner_id = u.id
    WHERE u.role = 'user'
    GROUP BY u.id, u.username, u.phone
    ORDER BY wins DESC
  `;

  const result = await client.execute({ sql });
  return result.rows;
}
}

export default User;