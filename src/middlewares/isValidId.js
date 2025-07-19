import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
        return res.status(400).json({
            status: 400,
            message: `${contactId} is not a valid id format`,
        });
    }

    next();
};