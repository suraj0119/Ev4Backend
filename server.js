require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');
const auth = require('./middleware/auth');
const userRoutes = require('./routes/user');  // Corrected the import path
const eventRoutes = require('./routes/event'); // Corrected the import path
const initSocket = require('./socket/index');
const requestTiming = require('./middleware/requestTiming');

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(rateLimiter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/users', userRoutes);
app.use('/events', auth, eventRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Start server
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
