import client from '../config/db.js';

export class BingoCard {

  static async findById(id) {
    const query = 'SELECT * FROM bingo_cards WHERE id = ?';
    return await client.execute({ sql: query, args: [id] });
  }

  // New method to find a BingoCard by ID with reservation details
  static async findByIdWithReservation(id) {
    const query = `
      SELECT bc.*, r.user_id AS reserved_by, r.payment_status
      FROM bingo_cards bc
      LEFT JOIN reservations r
        ON bc.id = r.card_id AND r.payment_status IN ('pending', 'paid')
      WHERE bc.id = ?
      ORDER BY r.date DESC
      LIMIT 1
    `;
    return await client.execute({ sql: query, args: [id] });
  }

  // Find all BingoCards reserved by a specific user
  static async findAllByUser(userId) {
    const query = `
      SELECT bc.*
      FROM bingo_cards bc
      JOIN reservations r ON bc.id = r.card_id
      WHERE r.user_id = ? AND r.payment_status IN ('pending', 'paid')
    `;
    return await client.execute({ sql: query, args: [userId] });
  }

  // Find all available BingoCards that are not reserved
  static async findAvailable() {
  const query = `
    SELECT * FROM bingo_cards
    WHERE id NOT IN (
      SELECT card_id FROM reservations WHERE payment_status IN ('pending', 'paid')
    )
  `;
  return await client.execute({ sql: query });
}

  // Reserve a BingoCard for a user
  static async reserve(cardId, userId) {
    // First check if the card is already reserved
    const checkQuery = `
      SELECT 1 FROM reservations
      WHERE card_id = ? AND payment_status IN ('pending', 'paid')
      LIMIT 1
    `;
    const { rows } = await client.execute({ sql: checkQuery, args: [cardId] });

    if (rows.length > 0) {
      return { rowsAffected: 0 }; // Ya está reservado
    }

    // Insert the reservation
    const insertQuery = `
      INSERT INTO reservations (user_id, card_id)
      VALUES (?, ?)
    `;
    await client.execute({ sql: insertQuery, args: [userId, cardId] });

    return { rowsAffected: 1 };
  }

  // Cancel a reservation for a BingoCard
  static async cancelReservation(cardId, userId) {
    const updateQuery = `
      UPDATE reservations
      SET payment_status = 'canceled'
      WHERE card_id = ? AND user_id = ? AND payment_status IN ('pending', 'paid')
    `;
    const result = await client.execute({ sql: updateQuery, args: [cardId, userId] });

    const rowsAffected = result.rowsAffected ?? 0;

    return { rowsAffected };
  }

  static async findReservedCards() {
    const query = `
      SELECT bc.id, bc.numbers, r.user_id, r.date, r.payment_status
      FROM bingo_cards bc
      JOIN reservations r ON bc.id = r.card_id
      WHERE r.payment_status = 'pending'
    `;
    return await client.execute({ sql: query });
  }

  static async approveReservation(cardId, userId) {
    const query = `
      UPDATE reservations
      SET payment_status = 'paid'
      WHERE card_id = ? AND user_id = ? AND payment_status = 'pending'
    `;
    const result = await client.execute({ sql: query, args: [cardId, userId] });
    const rowsAffected = result.rowsAffected ?? 0;
    return { rowsAffected };
  }

  static async rejectReservation(cardId, userId) {
    const query = `
      UPDATE reservations
      SET payment_status = 'canceled'
      WHERE card_id = ? AND user_id = ? AND payment_status = 'pending'
    `;
    const result = await client.execute({ sql: query, args: [cardId, userId] });
    const rowsAffected = result.rowsAffected ?? 0;
    return { rowsAffected };
  }
}