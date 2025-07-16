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
  static async findByName(username) {
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [username],
    });
    if (result.rows.length === 0) return null;

    // Convert the first row to a User instance
    return new User(result.rows[0]);
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
