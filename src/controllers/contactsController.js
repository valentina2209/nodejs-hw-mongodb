import {deleteContact,
        getAllContacts,
        getContactById,
        updateContact,
        createContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });

}

export async function getContactByIdController(req, res, next) {

  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });

}

export async function createContactController(req, res, next) {

  const { name, phoneNumber, contactType} = req.body;

  if (!name || !phoneNumber || !contactType) {
    return next(createHttpError(400, 'Missing required fields: name, phoneNumber, contactType'));
  }

  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message:  `Successfully created a contact!`,
    data: contact,
  });

};

export async function patchContactController(req, res, next) {

  const { contactId } = req.params;

  const updates = req.body;

  const contact = await updateContact(contactId, updates);

  if (!contact) {
    return  next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });

};

export async function deleteContactController (req, res, next) {

  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();

};
