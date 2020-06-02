// Auth controller
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * här registrerar man en ny användare
 *
 * POST /
 */
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Create user request failed validation:", errors.array());
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
    return;
}

const validData = matchedData(req);

// gör om lösenordet
try {
    validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds);

} catch (error) {
    res.status(500).send({
        status: 'error',
        message: 'Exception thrown when hashing the password',
    })
}

try {
    const user = await new models.User(validData).save();
    console.log("Created new user successfully:", user);

    res.status(201).send({
        status: 'success',
        data: null,
    });

} catch (error) {
    res.status(500).send({
        status: 'error',
        message: 'Something went wrong',
    });
    throw error;
    }
}

module.exports = {
    register,
}