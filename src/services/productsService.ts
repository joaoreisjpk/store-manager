const productModel = require("../models/productModel");

const getByName = async (name) => productModel.getByName(name);

module.exports = { getByName };