const ShoppingRepository = require('../database/repository/shopping-reposiroty');
const { FormatedData } = require('../utils');
const { AppError } = require('../utils/app-error');

class ShoppingService {
    constructor() {
        this.repository = new ShoppingRepository();
    }

    GetOrders(customerId) {
        try {
            const orders = this.repository.GetOrders(customerId);
            return FormatedData(orders);
        } catch (error) {
            console.log(error.message);
            throw new AppError(error.message, 500);
        }
    }
    async CreateNewOrder(customerId, txnId) {
        try {
            const orderResult = await this.repository.CreateOrder(
                customerId,
                txnId,
            );
            return FormatedData(orderResult);
        } catch (error) {
            console.log(error.message);
            throw new AppError(error.message, 500);
        }
    }
}

module.exports = new ShoppingService();
