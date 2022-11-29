import express from 'express';
import cors from 'cors';
// import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import taskRoutes from './routes/taskRoute.js';

const app = express();

// Middleware setup
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:8000',
      'https://mern-task-manager-0psf.onrender.com/',
    ],
  })
);

// Routes
app.use('/api/tasks', taskRoutes);

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('frontend/dist'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
        // .yellow.bold
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
