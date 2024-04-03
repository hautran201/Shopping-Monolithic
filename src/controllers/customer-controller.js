const { AppError } = require('../utils/app-error');
const CustomerService = require('../services/customer-service');

module.exports = {
    SignUp: async (req, res, next) => {
        try {
            const { email, password, phone } = req.body;

            const customer = await CustomerService.SignUp({
                email: email,
                password: password,
                phone,
            });

            res.status(201).json(customer);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    SignIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const customer = await CustomerService.SignIn({
                email: email,
                password: password,
            });

            res.status(201).json(customer);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    Profile: async (req, res, next) => {
        res.send('API Profile');
    },
};
