import CardPrice from '../models/CardPrice.js';

export const getCardPrice = async (req, res) => {
  try {
    const priceData = await CardPrice.getCurrentPrice();
    if (!priceData) {
      return res.status(200).json({ error: 'Precio del cartón no establecido.' });
    }
    return res.status(200).json(priceData);
  } catch (error) {
    console.error('Error getting card price:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const updateCardPrice = async (req, res) => {
  try {
    const { price } = req.body;

    if (price == null || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Valor de precio inválido.' });
    }

    const updatedPrice = await CardPrice.updatePrice(parseFloat(price));

    return res.status(200).json({
      message: 'Precio del cartón actualizado correctamente.',
      price: updatedPrice.price,
      updated_at: updatedPrice.updated_at
    });

  } catch (error) {
    console.error('Error updating card price:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};