import {deleteContact,
        getAllContacts,
        getContactById,
        updateContact,
        createContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filters = parseFilterParams(req.query);

 console.log('FILTER:', filters);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters: {
      ...filters,
      userId: req.user._id,
    },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });

}

export async function getContactByIdController(req, res, next) {

  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user._id);

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
  const { name, phoneNumber, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    return next(createHttpError(400, 'Missing required fields: name, phoneNumber, contactType'));
  }

  let photoUrl = '';
  const photo = req.file;

  if (photo) {
    const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
    photoUrl = useCloudinary
      ? await saveFileToCloudinary(photo)
      : await saveFileToUploadDir(photo);
  }

  const contact = await createContact({
    ...req.body,
    photo: photoUrl,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

export async function patchContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const updates = { ...req.body };
    const photo = req.file;

    if (photo) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      const photoUrl = useCloudinary
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);
      updates.photo = photoUrl;
    }

    const contact = await updateContact(contactId, updates, req.user._id);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactController (req, res, next) {

  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();

};
