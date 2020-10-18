const { check, header, body,query, validationResult } = require('express-validator')

const loginValidation = [
    body('username', "username is required.")
        .exists()
        .withMessage("Username is required."),
    body('password', "password is required.")
        .exists()
        .withMessage("Password is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
 ]

 const registerValidation = [
    body('username', "username is required.")
        .exists()
        .withMessage("Username is required."),
    body('password', "password is required.")
        .exists()
        .withMessage("Password is required."),
    body('full_name', "full_name is required.")
    .exists()
    .withMessage("full_name is required."),
    body('user_role', "user_role is required.")
        .exists()
        .withMessage("user_role is required."),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
 ]


 module.exports={loginValidation,registerValidation}
