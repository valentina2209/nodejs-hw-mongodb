import { CONTACT_TYPES } from "../constants/contactTypes.js";

const parseType = (type) => {
  if (typeof type !== 'string') return;
  return CONTACT_TYPES.includes(type) ? type : undefined;
};

const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite !== 'string') return;
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    const filters = {};


  if (parsedType !== undefined) {
    filters.contactType = parsedType;
  }

  if (parsedIsFavourite !== undefined) {
    filters.isFavourite = parsedIsFavourite;
  }

    return filters;
};
