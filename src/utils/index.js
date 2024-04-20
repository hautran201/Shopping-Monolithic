const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotFoundError, AppError } = require('./app-error');
const { JWT_SECRET } = require('../config');

module.exports.GenSalt = (lenght) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(lenght, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                resolve(salt);
            }
        });
    });
};

module.exports.GeneratePassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

module.exports.ValidatePassword = async (
    interedPassword,
    savePassword,
    salt,
) => {
    try {
        return (
            (await this.GeneratePassword(interedPassword, salt)) ===
            savePassword
        );
    } catch (error) {
        throw new NotFoundError(error.message, 401);
    }
};

module.exports.GenerateToken = async (payload) => {
    return await jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports.ValidateSignature = async (req) => {
    try {
        const signature = req.get('Authorization').split(' ')[1];
        const payload = await jwt.verify(signature, JWT_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports.FormatedData = (data) => {
    if (data) {
        // console.log(data);
        return { data };
    } else {
        throw new NotFoundError('Data not Found!', 404);
    }
};
