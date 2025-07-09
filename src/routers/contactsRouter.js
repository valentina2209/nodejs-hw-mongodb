import {Router} from 'express';
import { getContactsController, getContactByIdController, createContactController } from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
export default router;

