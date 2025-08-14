import client from '../config/db.js';

export default class PossibleWinner {
  static async create({ game_id, user_id, card_id, pattern_id }) {
    const result = await client.execute(
      `INSERT OR IGNORE INTO possible_winners
       (game_id, user_id, card_id, pattern_id)
       VALUES (?, ?, ?, ?)`,
      [game_id, user_id, card_id, pattern_id]
    );

    return { id: result.lastInsertRowid ?? null, created_at: new Date().toISOString() };
  }

  static async exists(game_id, user_id, card_id) {
    const result = await client.execute(
      `SELECT 1 FROM possible_winners
       WHERE game_id = ? AND user_id = ? AND card_id = ?
       LIMIT 1`,
      [game_id, user_id, card_id]
    );

    if (Array.isArray(result)) return result.length > 0;
    if (result && Array.isArray(result.rows)) return result.rows.length > 0;
    return false;
  }

  static async findAllByGame(game_id) {
    const result = await client.execute(
      `SELECT pw.*, u.username, u.phone
       FROM possible_winners pw
       JOIN users u ON u.id = pw.user_id
       WHERE pw.game_id = ?`,
      [game_id]
    );

    if (Array.isArray(result)) return result;
    if (result && Array.isArray(result.rows)) return result.rows;
    return [];
  }
}
