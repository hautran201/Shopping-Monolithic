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
        try {
            const id = req.user.id;
            const data = await CustomerService.GetProfile(id);
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    AddAddress: async (req, res, next) => {
        try {
            const { street, postalCode, city, country } = req.body;
            const { id } = req.user;

            const data = await CustomerService.AddNewAddress(id, {
                street,
                postalCode,
                city,
                country,
            });

            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    GetShoppingDetail: async (req, res, next) => {
        try {
            const { id } = req.user;
            const data = await CustomerService.GetShopingDetails({ id });
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    GetWishlist: async (req, res, next) => {
        try {
            const id = req.user.id;
            const data = await CustomerService.GetWishlist(id);
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
};
