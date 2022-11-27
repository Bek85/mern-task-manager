import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import taskRoutes from './routes/taskRoute.js';
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware setup
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:8000/'],
  })
);

// Routes
app.use('/api/tasks', taskRoutes);

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
