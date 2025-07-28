import { Router } from 'express';
import contactsRouter from './contactsRouter.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);

export default router;








