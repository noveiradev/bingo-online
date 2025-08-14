import client from '../config/db.js';
export class MarkedNumber {
  constructor({ id, reservation_id, game_id, card_id, marked_numbers }) {
    this.id = id;
    this.reservation_id = reservation_id;
    this.game_id = game_id;
    this.card_id = card_id;
    this.marked_numbers = marked_numbers ? JSON.parse(marked_numbers) : [];
  }

  static async findByReservationGameAndCard(reservationId, gameId, cardId) {
    const result = await client.execute(
      `SELECT * FROM marked_numbers 
       WHERE reservation_id = ? AND game_id = ? AND card_id = ?`,
      [reservationId, gameId, cardId]
    );
    const row = result.rows ? result.rows[0] : result[0];
    if (!row) return null;
    return new MarkedNumber(row);
  }

  static async findByReservationId(reservationId) {
    const result = await client.execute(
      `SELECT * FROM marked_numbers WHERE reservation_id = ?`,
      [reservationId]
    );
    const row = result.rows ? result.rows[0] : result[0];
    if (!row) return null;
    return new MarkedNumber(row);
  }

  static async findByGameAndCard(gameId, cardId) {
    const result = await client.execute(
      `SELECT * FROM marked_numbers WHERE game_id = ? AND card_id = ?`,
      [gameId, cardId]
    );
    const row = result.rows ? result.rows[0] : result[0];
    if (!row) return null;
    return new MarkedNumber(row);
  }

  static async upsertMarkedNumbers(reservationId, userId, gameId, cardId, markedNumbers) {
    if (!reservationId || !userId || !gameId || !cardId || !Array.isArray(markedNumbers)) {
      throw new Error('Parámetros inválidos en upsertMarkedNumbers');
    }

    const markedNumbersJson = JSON.stringify(markedNumbers);

    const existing = await this.findByReservationGameAndCard(reservationId, gameId, cardId);

    if (existing) {
      const query = `
        UPDATE marked_numbers
        SET marked_numbers = ?, updated_at = CURRENT_TIMESTAMP
        WHERE reservation_id = ? AND user_id = ? AND game_id = ? AND card_id = ?
      `;
      await client.execute(query, [markedNumbersJson, reservationId, userId, gameId, cardId]);
      return await this.findByReservationGameAndCard(reservationId, gameId, cardId);
    } else {
      const query = `
        INSERT INTO marked_numbers (reservation_id, user_id, game_id, card_id, marked_numbers)
        VALUES (?, ?, ?, ?, ?)
      `;
      await client.execute(query, [reservationId, userId, gameId, cardId, markedNumbersJson]);
      return await this.findByReservationGameAndCard(reservationId, gameId, cardId);
    }
  }

    static async findAllByGame(game_id) {
    try {
      const result = await client.execute(
        `SELECT * FROM marked_numbers WHERE game_id = ?`,
        [game_id]
      );

      if (Array.isArray(result)) return result;
      if (result && Array.isArray(result.rows)) return result.rows;

      return [];
    } catch (error) {
      console.error('Error en findAllByGame:', error);
      return [];
    }
  }
}
