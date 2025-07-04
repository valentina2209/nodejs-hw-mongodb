import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contactsRouter.js';


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

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = getEnvVar('PORT', 3000);
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
}

























