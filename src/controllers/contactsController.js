import { deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export async function getContactsController(req, res, next) {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getContactByIdController(req, res, next) {
  try {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }

}

export async function createContactController(req, res, next) {
  try {
    const { name, phoneNumber, contactType} = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(400, 'Missing required fields: name, phoneNumber, contactType');
    }

    const contact = await updateContact(req.body);

    res.status(201).json({
      status: 201,
      message:  `Successfully created a contact!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }

};

export async function patchContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const updates = req.body;

    const contact = await updateContact(contactId, updates);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export async function deleteContactController (req, res, next) {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
