import {Router} from 'express';
import { getContactsController, getContactByIdController } from '../controllers/contactsController.js';

const router = Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController);

export default router;

