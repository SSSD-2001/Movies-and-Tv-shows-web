import express from 'express';
import cors from 'cors';
import { setRoutes } from './api/routes';
import { errorHandler } from './api/middleware';
import { config } from './config';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = config.port || 3000;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to Movies & TV Shows API');
});

// Set up routes
setRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});