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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.GUEST), ctrlWrapper(getContactsController));

router.get(
        '/:contactId',
        checkRoles(ROLES.GUEST, ROLES.ADMIN),
        isValidId,
        ctrlWrapper(getContactByIdController)
);

router.post(
        '/',
        checkRoles(ROLES.GUEST),
        validateBody(addContactSchema),
        ctrlWrapper(createContactController)
);

router.patch(
        '/:contactId',
        checkRoles(ROLES.GUEST, ROLES.ADMIN),
        isValidId,
        validateBody(updateContactSchema),
        ctrlWrapper(patchContactController)
);

router.delete(
        '/:contactId',
        checkRoles(ROLES.GUEST),
        isValidId,
        ctrlWrapper(deleteContactController)
);

export default router;

