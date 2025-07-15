import client from '../config/db.js';

class User {
  constructor({ id, name, password, security_question, security_answer, phone, registration_date, role }) {
    this.id = id;
    this.name = name;
    this.password = password; 
    this.security_question = security_question;
    this.security_answer = security_answer;
    this.phone = phone;
    this.registration_date = registration_date;
    this.role = role;
  }

  // Find user by ID
  static async findByName(name) {
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE name = ?',
      args: [name],
    });
    if (result.rows.length === 0) return null;

    // Convert the first row to a User instance
    return new User(result.rows[0]);
  }

  // Save new user to the database
  async save() {
    await client.execute({
      sql: `
        INSERT INTO users (name, password, security_question, security_answer, phone)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        this.name,
        this.password,
        this.security_question,
        this.security_answer,
        this.phone
      ],
    });
  }
}

export default User;
