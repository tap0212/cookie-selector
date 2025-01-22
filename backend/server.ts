import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import apiRoutes from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8080;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.sync();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer(); 