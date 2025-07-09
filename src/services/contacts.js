import { Contact} from '../db/models/contactModel.js'

export const getAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};

export const createContact = async (contact) => {
    const newContact = await Contact.create(contact);
    return newContact;
};

export const updateContact = async (contactId, updates) => {
    const updateContact = await Contact.findByIdAndUpdate(contactId, updates, {
        new: true,
        runValidators: true,
    });
    return updateContact;
};
