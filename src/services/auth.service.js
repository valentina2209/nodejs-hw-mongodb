import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { User } from '../db/models/user.js';
// import { Session } from '../db/models/session.js';

export async function registerUser(payload) {
    const user = await User.findOne({ email: payload.email });

    if (user !== null) {
        throw new createHttpError.Conflict('Email is already in use');
    }

    payload.password = await bcrypt.hash(payload.password, 10);

    return User.create(payload);
}
