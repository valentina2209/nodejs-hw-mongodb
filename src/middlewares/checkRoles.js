import createHttpError from 'http-errors';
import { Contact } from '../db/models/contactModel.js';
import { ROLES } from '../constants/index.js';

export const checkRoles = (...roles) => async (req, res, next) => {
    const { contact } = req;
    if (!contact) {
        next(createHttpError(401));
        return;
    }

    const { role } = contact;
    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN ) {
        next();
        return;
    }

    if (roles.includes(ROLES.GUEST) && role === ROLES.GUEST) {
        const { contactId } = req.params;
        if (!contactId) {
            next(createHttpError(403));
            return;
        }

        const contact = await Contact.findOne({
            _id: contactId,
            userId: req.user._id,
        });

        if (contact) {
            next();
            return;
        }
    }

    next(createHttpError(403));
};
