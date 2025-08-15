import client from '../config/db.js';

export default class CardPrice {
  static async getCurrentPrice() {
    const { rows } = await client.execute(
      `SELECT price, updated_at
       FROM card_prices
       ORDER BY id DESC
       LIMIT 1`
    );
    return rows.length > 0 ? rows[0] : null;
  }

  static async updatePrice(newPrice) {
    await client.execute(
      `UPDATE card_prices
       SET price = ?, updated_at = datetime('now')
       WHERE id = (SELECT id FROM card_prices ORDER BY id DESC LIMIT 1)`,
      [newPrice]
    );
    return this.getCurrentPrice();
  }
}