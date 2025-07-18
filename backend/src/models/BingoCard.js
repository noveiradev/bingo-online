import client from '../config/db.js';

export class BingoCard {
  
  static async findAllByUser(userId) {
    return await client.execute({
      sql: `SELECT * FROM bingo_cards WHERE user_id = ?`,
      args: [userId]
    });
  }

  static async findAvailable() {
    return await client.execute({
      sql: `SELECT * FROM bingo_cards WHERE status = 'available'`
    });
  }

  static async reserve(cardId, userId) {
    return await client.execute({
      sql: `
        UPDATE bingo_cards
        SET status = 'reserved', user_id = ?
        WHERE id = ? AND status = 'available'
      `,
      args: [userId, cardId]
    });
  }
}