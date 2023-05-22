import express from 'express';
import Product from '../models/productModel.js';

const ProductRouter = express.Router();



ProductRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

ProductRouter.get('/token/:token', async (req, res) => {
  const token = req.params.token;
  const product = await Product.findOne({ token });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product was not found' });
  }
});

ProductRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product was not found' });
  }
});


// ProductRouter.get('/', async (req, res) => {
//   await Product.deleteMany({});
//   const createdProducts = await Product.insertMany(data.products);
//   res.send({ createdProducts });
// });

export default ProductRouter;
