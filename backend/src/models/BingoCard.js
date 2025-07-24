import client from '../config/db.js';

export class BingoCard {
  static async findById(id) {
    const query = 'SELECT * FROM bingo_cards WHERE id = ?';
    return await client.execute({ sql: query, args: [id] });
  }

  static async findByIdWithReservation(id, userId) {
    const query = `
      SELECT bc.*, r.user_id AS reserved_by, r.payment_status
      FROM bingo_cards bc
      LEFT JOIN reservations r
        ON bc.id = r.card_id AND r.payment_status IN ('pending', 'paid')
      WHERE bc.id = ?
      LIMIT 1
    `;
    const result = await client.execute({ sql: query, args: [id] });
    const card = result.rows[0];

    if (card && card.reserved_by && card.reserved_by !== userId) {
      return null; 
    }

    return card;
  }

  static async findAllByUser(userId) {
    const query = `
      SELECT 
        bc.*, 
        r.payment_status, 
        r.is_gift
      FROM bingo_cards bc 
      JOIN reservations r ON bc.id = r.card_id
      WHERE r.user_id = ? AND r.payment_status IN ('pending', 'paid')
    `;
    return await client.execute({ sql: query, args: [userId] });
  }


  static async findAvailable() {
    const query = `
      SELECT * FROM bingo_cards
      WHERE id NOT IN (
        SELECT card_id FROM reservations WHERE payment_status IN ('pending', 'paid')
      )
    `;
    return await client.execute({ sql: query });
  }

  static async reserve(cardId, userId) {
    const checkQuery = `
      SELECT 1 FROM reservations
      WHERE card_id = ? AND payment_status IN ('pending', 'paid')
      LIMIT 1
    `;
    const { rows } = await client.execute({ sql: checkQuery, args: [cardId] });

    if (rows.length > 0) {
      return { rowsAffected: 0 };
    }

    const insertQuery = `
      INSERT INTO reservations (user_id, card_id)
      VALUES (?, ?)
    `;
    await client.execute({ sql: insertQuery, args: [userId, cardId] });

    return { rowsAffected: 1 };
  }

  static async cancelReservation(cardId, userId) {
    const updateQuery = `
      UPDATE reservations
      SET payment_status = 'canceled'
      WHERE card_id = ? AND user_id = ? AND payment_status IN ('pending', 'paid')
    `;
    const result = await client.execute({ sql: updateQuery, args: [cardId, userId] });
    return { rowsAffected: result.rowsAffected ?? 0 };
  }

  static async findReservedCards() {
    const query = `
      SELECT 
        bc.id AS card_id, 
        bc.numbers, 
        r.user_id, 
        u.username, 
        u.phone, 
        r.date, 
        r.payment_status
      FROM bingo_cards bc
      JOIN reservations r ON bc.id = r.card_id
      JOIN users u ON r.user_id = u.id
      WHERE r.payment_status = 'pending'
    `;
    return await client.execute({ sql: query });
  }
  
  static async countPaidReservationsByUser(userId) {
    const query = `
      SELECT COUNT(*) AS total
      FROM reservations
      WHERE user_id = ? AND payment_status = 'paid'
    `;
    const { rows } = await client.execute({ sql: query, args: [userId] });
    return rows[0]?.total || 0;
  }

  static async assignFreeCardToUser(userId) {
    const availableCards = await this.findAvailable();
    if (availableCards.rows.length === 0) {
      return { success: false, message: 'No hay cartones disponibles para obsequiar.' };
    }

    const randomCard = availableCards.rows[Math.floor(Math.random() * availableCards.rows.length)];
    const insertQuery = `
      INSERT INTO reservations (user_id, card_id, payment_status, is_gift)
      VALUES (?, ?, 'paid', TRUE)
    `;
    await client.execute({ sql: insertQuery, args: [userId, randomCard.id] });

    return { success: true, cardId: randomCard.id };
  }

  static async approveReservation(cardId, userId) {
    const query = `
      UPDATE reservations
      SET payment_status = 'paid'
      WHERE card_id = ? AND user_id = ? AND payment_status = 'pending'
    `;

    const result = await client.execute({ sql: query, args: [cardId, userId] });

    const rowsAffected = result.rowsAffected ?? 0;

    if (rowsAffected > 0) {
      const totalPaid = await this.countPaidReservationsByUser(userId);
      if (totalPaid % 3 === 0) {
        await this.assignFreeCardToUser(userId);
      }
    }

    return { rowsAffected };
  }

  static async rejectReservation(cardId, userId) {
    const query = `
      UPDATE reservations
      SET payment_status = 'canceled'
      WHERE card_id = ? AND user_id = ? AND payment_status = 'pending'
    `;
    const result = await client.execute({ sql: query, args: [cardId, userId] });
    return { rowsAffected: result.rowsAffected ?? 0 };
  }

  static async validatePaidReservation(reservationId, userId) {
  const query = `
    SELECT 1 FROM reservations
    WHERE id = ? AND user_id = ? AND payment_status = 'paid'
    LIMIT 1
  `;
  const result = await client.execute({ sql: query, args: [reservationId, userId] });
  return result.rows.length > 0;
}
}