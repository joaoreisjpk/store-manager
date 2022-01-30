const {
  QuantityValidation,
  ProductIdValidation,
} = require('../helpers/salesValidation');
const salesModel = require('../models/salesModel');

const salesValidation = async (req, res, next) => {
  const { body } = req;

  const productIdArray = body.map(({ product_id: productId }) => productId);
  const quantityArray = body.map(({ quantity }) => quantity);

  const productIdValidation = ProductIdValidation(productIdArray);
  const quantityValidation = QuantityValidation(quantityArray);
  if (productIdValidation) {
    return res
      .status(productIdValidation.code)
      .json({ message: productIdValidation.message });
  }

  if (quantityValidation) {
    return res
      .status(quantityValidation.code)
      .json({ message: quantityValidation.message });
  }

  next();
};

const createSale = async (req, res) => {
  const { body } = req;
  const newProduct = await salesModel.create(body);
  res.status(201).json(newProduct);
};

const getSaleById = async (req, res) => {
  const { params } = req;

  const getProduct = await salesModel.getById(params.id);

  if (!getProduct.length) return res.status(404).json({ message: 'Product not found' });

  return res.json(getProduct);
};

module.exports = { salesValidation, createSale, getSaleById };