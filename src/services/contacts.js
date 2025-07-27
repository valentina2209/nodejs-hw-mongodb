import { Contact} from '../db/models/contactModel.js'
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import { CONTACT_TYPES } from '../constants/contactTypes.js';


export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filters = CONTACT_TYPES,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find(filters);

    const contactsCount = await Contact.countDocuments(filters);

    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder})
        .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (contactId, userId) => {
    const contact = await Contact.findOne({ _id: contactId, userId});
    return contact;
};

export const createContact = async (contact) => {
    const newContact = await Contact.create(contact);
    return newContact;
};

export const updateContact = async (contactId, updates, userId ) => {
    const updateContact = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        updates,
        { new: true,
        runValidators: true,
    });
    return updateContact;
};

export const deleteContact = async (contactId, userId) => {
    const contact = await Contact.findOneAndDelete({
        _id: contactId,
        userId
    });

    return contact;
};
