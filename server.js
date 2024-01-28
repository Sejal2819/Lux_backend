import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// import { DATABASE } from './config.js';
import authRoutes from './routes/auth.js';
import adRoutes from './routes/ad.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db_connected'))
  .catch((err) => console.log('Error occurred', err));

// middlewares
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', adRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
