const productModel = require("../model/productModel");

const createProduct = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json("please add a value");
  }

  const existingProduct = await productModel.findOne({ name });
  if (existingProduct) {
    res.status(409).json("product exists");
    return;
  }

  const newProduct = await productModel.create({ name });
  console.log(newProduct);
  res.status(200).json(newProduct);
};

const getProducts = async (req, res) => {
  const allProducts = await productModel.findAll();
  res.status(200).json(allProducts);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const findProduct = await productModel.findByPk(id);
  findProduct.destroy();
  res.status(204).json("product deleted");
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const findProduct = await productModel.findByPk(id);
  findProduct.update(req.body);
  findProduct.save();
  res.status(200).json("product updated");
};

module.exports = { createProduct, getProducts, deleteProduct, updateProduct };
