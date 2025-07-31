import { Contact} from '../db/models/contactModel.js'
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import { CONTACT_TYPES } from '../constants/contactTypes.js';
import mongoose from 'mongoose';


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

export const updateContact = async (contactId, updates, userId) => {
  const contactObjectId = new mongoose.Types.ObjectId(contactId);
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const contact = await Contact.findOneAndUpdate(
    { _id: contactObjectId, userId: userObjectId },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  return contact;
};


export const deleteContact = async (contactId, userId) => {
    const contact = await Contact.findOneAndDelete({
        _id: contactId,
        userId
    });

    return contact;
};
