export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error} = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message,
            });
        }

        next();
    };
};
