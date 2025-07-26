import client from '../config/db.js';

class WinningCard {
  static async create({ game_id, card_id, pattern_id, user_id }) {
    await client.execute(
      'INSERT INTO winning_cards (game_id, card_id, pattern_id, user_id) VALUES (?, ?, ?, ?)',
      [game_id, card_id, pattern_id, user_id]
    );
  }
}

export default WinningCard;