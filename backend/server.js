import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
const PORT = process.env.PORT || 8000;

// Middleware setup
dotenv.config();

const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('home page');
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
