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

  static async isPatternInUse(patternId) {
    const gamesResult = await client.execute(
      `SELECT COUNT(*) AS count FROM games WHERE pattern_id = ?`,
      [patternId]
    );
    const gamesCount = gamesResult.rows[0]?.count || 0;

    if (gamesCount > 0) return true;

    const winningCardsResult = await client.execute(
      `SELECT COUNT(*) AS count FROM winning_cards WHERE pattern_id = ?`,
      [patternId]
    );
    const winningCardsCount = winningCardsResult.rows[0]?.count || 0;

    return winningCardsCount > 0;
  }

  static async deletePattern(patternId) {
    await client.execute({
      sql: 'DELETE FROM bingo_patterns WHERE id = ?',
      args: [patternId],
    });
  }
}