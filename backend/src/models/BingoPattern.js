import client from '../config/db.js';
export class BingoPattern {
  static async create(name, description, pattern) {
    const result = await client.execute(
      `INSERT INTO bingo_patterns (name, description, pattern)
       VALUES (?, ?, ?)`,
      [name, description, JSON.stringify(pattern)]
    );
    return result;
  }

  static async findAll() {
    const result = await client.execute(`SELECT * FROM bingo_patterns`);
    const rows = result.rows ?? result[0]; 
    return rows.map(row => ({
      id: row[0],
      name: row[1],
      description: row[2],
      pattern: JSON.parse(row[3]) 
    }));
  }

  static async findById(id) {
    const result = await client.execute('SELECT * FROM bingo_patterns WHERE id = ?', [id]);
    return result.rows[0] || null;
  }
}
