import {Router} from 'express';

import { getContactsController,
        getContactByIdController,
        createContactController,
        patchContactController,
        deleteContactController, }
        from '../controllers/contacts.Controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { addContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get(
        '/',
        ctrlWrapper(getContactsController)
);
router.get(
        '/:contactId',
        isValidId,
        ctrlWrapper(getContactByIdController)
);
router.post(
        '/',
        upload.single('photo'),
        validateBody(addContactSchema),
        ctrlWrapper(createContactController)
);
router.patch(
        '/:contactId',
        upload.single('photo'),
        isValidId,
        validateBody(updateContactSchema),
        ctrlWrapper(patchContactController)
);
router.delete(
        '/:contactId',
        isValidId,
        ctrlWrapper(deleteContactController)
);

export default router;

