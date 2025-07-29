import client from '../config/db.js';

export class MobilePayment {
  static async create({ id_number, bank, phone, name }) {
    const result = await client.execute(`SELECT COUNT(*) AS count FROM mobile_payments`);
    const count = result.rows[0]?.count || 0;

    if (count >= 3) {
      throw new Error('Ya hay 3 pagos registrados.');
    }

    console.log("Valores recibidos:", { bank, phone, id_number, name });

    await client.execute(
      `INSERT INTO mobile_payments (id_number, bank, phone, name) VALUES (?, ?, ?, ?)`,
      [id_number, bank, phone, name]
    );
  }

  static async setActive(id) {
    await client.execute(`UPDATE mobile_payments SET is_active = 0`);
    await client.execute(`UPDATE mobile_payments SET is_active = 1 WHERE id = ?`, [id]);
  }

  static async delete(id) {
    await client.execute(`DELETE FROM mobile_payments WHERE id = ?`, [id]);
  }

  static async getAll() {
    const result = await client.execute(`SELECT * FROM mobile_payments`);
    return result.rows;
  }

  static async getActive() {
    const result = await client.execute(
      `SELECT * FROM mobile_payments WHERE is_active = 1 LIMIT 1`
    );
    return result.rows[0];
  }
}
