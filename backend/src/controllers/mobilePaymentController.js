import { MobilePayment } from '../models/MobilePayment.js';

export const createPayment = async (req, res) => {
  try {
    const { id_number, bank, phone, name } = req.body;
    await MobilePayment.create({ id_number, bank, phone, name });
    res.status(200).json({ success: true, message: 'Pago móvil registrado.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const activatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await MobilePayment.setActive(id);
    res.status(200).json({ success: true, message: 'Pago móvil activado.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al activar el pago móvil.' });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await MobilePayment.delete(id);
    res.status(200).json({ success: true, message: 'Pago móvil eliminado.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el pago móvil.' });
  }
};

export const getAllPayments = async (_req, res) => {
  try {
    const payments = await MobilePayment.getAll();
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los pagos móviles.' });
  }
};

export const getActivePayment = async (_req, res) => {
  try {
    const payment = await MobilePayment.getActive();
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el pago móvil activo.' });
  }
};