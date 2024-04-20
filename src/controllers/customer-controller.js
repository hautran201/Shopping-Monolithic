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
    GetCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await CustomerService.GetCartDetail(userId);
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    AddWishlist: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { productId } = req.body;

            const wishlist = await CustomerService.AddToWishlist(
                userId,
                productId,
            );
            res.status(201).json(wishlist);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    AddItemToCart: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;
            const cartResult = await CustomerService.ManagerCart(
                userId,
                productId,
                quantity,
                false,
            );
            res.status(201).json(cartResult);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    RemoveItemToCart: async (req, res, next) => {
        try {
            const productId = req.params.id;
            const userId = req.user.id;
            const data = await CustomerService.ManagerCart(
                userId,
                productId,
                0,
                true,
            );
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
};
