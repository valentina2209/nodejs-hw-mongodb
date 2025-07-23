import { registerUser } from "../services/auth.service.js";

export async function registerUserController(req, res) {
    const user = await registerUser(req.body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};
