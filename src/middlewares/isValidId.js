import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export function isValidId(req, res, next) {
    if (isValidObjectId(req.params.id) !== true) {
        throw createHttpError(400, 'Bad Request');
    }

    next();
}

