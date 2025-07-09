import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contactsRouter.js';
import { errorHandler } from './middlewares/errorHandler.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(pinoHttp({ logger }));


  app.use('/contacts', contactsRouter);


 
  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = getEnvVar('PORT', 3000);
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
}

























