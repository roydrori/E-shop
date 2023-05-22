import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import ProductRouter from './routes/productRoutes.js';
import UserRouter from './routes/UserRouter.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/signin', UserRouter);
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', ProductRouter);


app.use((err,req,res, next) => {
  res.status(500).send({message: err.message})
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    console.log('Connected to db');
  })
  .catch((err) => {
    console.error(`Failed to connect to db: ${err.message}`);
  });
