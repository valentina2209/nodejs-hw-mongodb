import { Router } from 'express';
import contactsRouter from './contactsRouter.js';
import authRouter from './auth.js';

const router = Router();

router.use('/', contactsRouter);
router.use('/auth', authRouter);

export default router;
