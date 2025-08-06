require('dotenv').config();
const express = require('express');
const connectDB = require('./config/DataBase');

const restaurantAuthRouter = require('./routes/restaurantAuth');
const menuRouter = require('./routes/menu');
const tableRouter = require('./routes/tables');

const app = express();
app.use(express.json());

// Mount routes
app.use('/api/restaurant', restaurantAuthRouter);
app.use('/api/restaurant/menu', menuRouter);
app.use('/api/restaurant/tables', tableRouter);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();