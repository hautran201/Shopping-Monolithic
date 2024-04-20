const { AppError } = require('../utils/app-error');
const ShoppingService = require('../services/shopping-service');

module.exports = {
    GetOrders: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await ShoppingService.GetOrders(userId);
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },

    CreateNewOrder: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { txnNumber } = req.body;
            const data = await ShoppingService.CreateNewOrder(
                userId,
                txnNumber,
            );
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
};
