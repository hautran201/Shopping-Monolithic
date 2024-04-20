const { AppError } = require('../../utils/app-error');
const { OrderModel, CustomerModel } = require('../models');

class ShoppingRepository {
    async GetOrders(customerId) {
        try {
            const orders = await OrderModel.find({ customerId });
            return orders;
        } catch (error) {
            throw new AppError('Unable to Find Orders', 500);
        }
    }

    async CreateOrder(customerId, txnId) {
        try {
            console.log(customerId);
            const profile = await CustomerModel.findById(customerId).populate(
                'cart.product',
            );
            if (profile) {
                let amount = 0;
                let cartItems = profile.cart;
                if (cartItems.length > 0) {
                    cartItems.map((item) => {
                        amount += item.product.price * item.unit;
                    });

                    const order = new OrderModel({
                        customerId,
                        amount,
                        txnId,
                        status: 'Received',
                        items: cartItems,
                    });
                    console.log(order);
                    profile.cart = [];

                    order.populate('items.product');
                    const orderResult = await order.save();

                    profile.orders.push(orderResult);

                    await profile.save();

                    return orderResult;
                }
            }
            return {};
        } catch (error) {
            console.log(error.message);
            throw new AppError('Unable to Create New Orders', 500);
        }
    }
}

module.exports = ShoppingRepository;
