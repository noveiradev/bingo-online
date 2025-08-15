import client from '../config/db.js';

class Game {
  constructor({ id, date, status, called_numbers, winner_id, pattern_id }) {
    this.id = id;
    this.date = date;
    this.status = status;
    this.called_numbers = called_numbers ? JSON.parse(called_numbers) : [];
    this.winner_id = winner_id;
    this.pattern_id = pattern_id;
  }

  static async create(patternId) {
    const date = new Date().toISOString();
    const status = 'waiting';
    const calledNumbersStr = JSON.stringify([]);
    const sql = `
      INSERT INTO games (date, status, called_numbers, winner_id, pattern_id)
      VALUES (?, ?, ?, NULL, ?)
    `;

    const result = await client.execute({
      sql,
      args: [date, status, calledNumbersStr, patternId],
    });

    const insertedId = result.insertId || result.lastInsertRowid || result.rows?.[0]?.id;

    return await Game.findById(insertedId);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM games WHERE id = ?';
    const result = await client.execute({
      sql,
      args: [id],
    });

    if (result.rows.length === 0) return null;

    return new Game(result.rows[0]);
  }

  static async getCurrentGame() {
    const sql = `
      SELECT * FROM games 
      WHERE status IN ('waiting', 'in_progress') 
      ORDER BY id DESC LIMIT 1
    `;
    const result = await client.execute({ sql, args: [] });

    if (result.rows.length === 0) return null;

    return new Game(result.rows[0]);
  }

  async addCalledNumber(number) {
    if (this.called_numbers.includes(number)) {
      throw new Error('Este número ya ha sido llamado');
    }

    this.called_numbers.push(number);

    const sql = `
      UPDATE games 
      SET called_numbers = ?, status = 'in_progress' 
      WHERE id = ?
    `;

    await client.execute({
      sql,
      args: [JSON.stringify(this.called_numbers), this.id],
    });
  }

  async endGame(winnerId) {
    const sql = `
      UPDATE games 
      SET status = 'finished', winner_id = ? 
      WHERE id = ?
    `;

    await client.execute({
      sql,
      args: [winnerId, this.id],
    });
  }

  async restartGame() {
    const sql = `
      UPDATE games 
      SET status = ?, called_numbers = ?, winner_id = ?
      WHERE id = ?
    `;

    await client.execute({
      sql,
      args: ['finished', JSON.stringify([]), null, this.id],
    });
  }

  static async updateWinner(gameId, winnerId) {
    await client.execute(
      'UPDATE games SET winner_id = ?, status = ? WHERE id = ?',
      [winnerId, 'finished', gameId]
    );
  }

  static async findActiveGameByUserId(userId) {
    const query = `
      SELECT 
        g.id AS game_id,
        g.status,
        g.called_numbers,
        g.pattern_id,
        bp.name AS pattern_name,
        bp.pattern
      FROM user_game ug
      JOIN games g ON ug.game_id = g.id
      JOIN bingo_patterns bp ON g.pattern_id = bp.id
      WHERE ug.user_id = ?
        AND g.status != 'finished'
      ORDER BY g.id DESC
      LIMIT 1
    `;

    const result = await client.execute({ sql: query, args: [userId] });
    return result.rows[0] || null;
  }
}

export default Game;