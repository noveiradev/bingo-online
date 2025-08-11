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

    for (const reservationId of reservationIds) {
      const existing = await client.execute(
        `SELECT id FROM selected_cards WHERE reservation_id = ? AND game_id = ?`,
        [reservationId, gameId]
      );

      if (existing.rows.length === 0) {
        await client.execute(
          `INSERT INTO selected_cards (game_id, reservation_id) VALUES (?, ?)`,
          [gameId, reservationId]
        );
      }
    }
  }

  static async findByGame(gameId) {
    const result = await client.execute(
      `SELECT * FROM selected_cards WHERE game_id = ?`,
      [gameId]
    );
    if (!result.rows || result.rows.length === 0) return [];
    return result.rows.map(row => new SelectedCard(row));
  }

  static async getUsedReservationIds() {
    const result = await client.execute(
      `SELECT DISTINCT reservation_id FROM selected_cards`
    );
    return result.rows.map(row => row.reservation_id);
  }
}