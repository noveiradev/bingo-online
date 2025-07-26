import client from '../config/db.js';
export class SelectedCard {
  constructor({ id, game_id, reservation_id }) {
    this.id = id;
    this.game_id = game_id;
    this.reservation_id = reservation_id;
  }

  static async assignCardsToGame(gameId, reservationIds) {
    if (!Array.isArray(reservationIds) || reservationIds.length === 0) {
      throw new Error('reservationIds debe ser un arreglo no vacío');
    }

    const insertQueries = reservationIds.map(reservationId =>
      client.execute(
        `INSERT INTO selected_cards (game_id, reservation_id) VALUES (?, ?)`,
        [gameId, reservationId]
      )
    );

    await Promise.all(insertQueries);
  }

  static async findByGame(gameId) {
    const result = await client.execute(
      `SELECT * FROM selected_cards WHERE game_id = ?`,
      [gameId]
    );
    if (!result.rows || result.rows.length === 0) return [];
    return result.rows.map(row => new SelectedCard(row));
  }
}
