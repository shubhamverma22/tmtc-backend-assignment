require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose
const DEFAULT_PORT = 3001;
const port = process.env.PORT || DEFAULT_PORT;

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { logger } = require('./utils/logs/logger');
const routes = require('./routes');

const app = express();

// MongoDB connection URL
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('MongoDB connected successfully');
  })
  .catch((err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Travel Itinerary API',
      version: '1.0.0',
      description: 'API for managing travel itineraries',
    },
  },
  apis: ['src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use('/api/v1', routes);

const server = app.listen(port, () => {
  logger.info(`Express server listening on port ${server.address().port}`);
});
