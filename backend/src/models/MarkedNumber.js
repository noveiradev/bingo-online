import client from '../config/db.js';

export class MarkedNumber {
  constructor({ id, reservation_id, marked_numbers, bingo_called }) {
    this.id = id;
    this.reservation_id = reservation_id;
    this.marked_numbers = marked_numbers ? JSON.parse(marked_numbers) : [];
    this.bingo_called = bingo_called === 1; // se guarda como INTEGER 0/1
  }

  static async findByReservationId(reservationId) {
    const result = await client.execute(
      `SELECT * FROM marked_numbers WHERE reservation_id = ?`,
      [reservationId]
    );
    if (!result.rows || result.rows.length === 0) return null;
    return new MarkedNumber(result.rows[0]);
  }

  static async upsertMarkedNumbers(reservationId, markedNumbers, bingoCalled) {
    const existing = await this.findByReservationId(reservationId);
    if (existing) {
      const query = `
        UPDATE marked_numbers
        SET marked_numbers = ?, bingo_called = ?
        WHERE reservation_id = ?
      `;
      await client.execute(query, [
        JSON.stringify(markedNumbers),
        bingoCalled ? 1 : 0,
        reservationId,
      ]);
      return await this.findByReservationId(reservationId);
    } else {
      const query = `
        INSERT INTO marked_numbers (reservation_id, marked_numbers, bingo_called)
        VALUES (?, ?, ?)
      `;
      await client.execute(query, [
        reservationId,
        JSON.stringify(markedNumbers),
        bingoCalled ? 1 : 0,
      ]);
      return await this.findByReservationId(reservationId);
    }
  }
}
