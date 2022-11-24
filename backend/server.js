import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware setup
dotenv.config();

app.get('/', (req, res) => {
  res.send('home page');
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
          .yellow.bold
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
