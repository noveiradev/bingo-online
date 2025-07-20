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

    static async updatePassword(id, newPassword) {
    await client.execute({
      sql: `
        UPDATE users SET password = ?
        WHERE id = ?
      `,
      args: [newPassword, id],
    });
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
}

export default User;
