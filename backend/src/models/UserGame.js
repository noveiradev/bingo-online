import client from '../config/db.js';

export class UserGame {
  constructor({ id, user_id, game_id }) {
    this.id = id;
    this.user_id = user_id;
    this.game_id = game_id;
  }

  static async addUserToGame(userId, gameId) {
    return await client.execute(
      `INSERT INTO user_game (user_id, game_id) VALUES (?, ?)`,
      [userId, gameId]
    );
  }

  static async findUserGame(userId, gameId) {
    const result = await client.execute(
      `SELECT * FROM user_game WHERE user_id = ? AND game_id = ?`,
      [userId, gameId]
    );
    return result.rows?.[0] || null;
  }
}
