const { AppError } = require('../../utils/app-error');
const { CustomerModel, AddressModel } = require('../models');

class CustomerRepository {
    async CreateCustomer({ email, password, phone, salt }) {
        try {
            const customer = new CustomerModel({
                email,
                password,
                phone,
                salt,
            });
            const resultCutomer = await customer.save();
            return resultCutomer;
        } catch (error) {
            throw new AppError('Unable to Create Customer', 500);
        }
    }

    async FindCustomer({ email }) {
        try {
            const existingCustomer = await CustomerModel.findOne({
                email,
            });
            return existingCustomer;
        } catch (error) {
            throw new AppError('Unable to Find Customer', 500);
        }
    }

    async FindCustomerById({ id }) {
        try {
            const existingCustomer = await CustomerModel.findById(id)
                .select('-password -salt')
                .populate('address')
                .populate('wishlist')
                .populate('orders')
                .populate('cart.product');

            return existingCustomer;
        } catch (error) {
            console.log(error.message);
            throw new AppError('Unable to Find Customer', 500);
        }
    }

    async CreateAddress({ id, street, postalCode, city, country }) {
        try {
            const profile = await CustomerModel.findById(id).select(
                '-password -salt',
            );
            if (profile) {
                const newAddress = await AddressModel.create({
                    street,
                    postalCode,
                    city,
                    country,
                });
                profile.address.push(newAddress._id);
                await profile.save();
            }
            return profile;
        } catch (error) {
            console.log(error.message);
            throw new AppError('Unable to Add New Address', 500);
        }
    }

    async GetWishlist(customerId) {
        try {
            const profile = await CustomerModel.findById(customerId).populate(
                'wishlist',
            );
            const wishlist = profile.wishlist;
            return wishlist;
        } catch (error) {
            throw new AppError('Unable to Get Wishlist', 500);
        }
    }
    async GetCartDetail(customerId) {
        const profile = await CustomerModel.findById(customerId).populate(
            'cart.product',
        );
        const cart = profile.cart;
        return cart;
    }
    async AddToWishlist(customerId, product) {
        try {
            const profile = await CustomerModel.findById(customerId);
            if (profile) {
                let wishlist = profile.wishlist;
                if (wishlist.length > 0) {
                    let isExist = false;
                    wishlist.map((item) => {
                        if (item.toString() === product._id.toString()) {
                            const index = wishlist.indexOf(item);
                            wishlist.splice(index, 1);
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        wishlist.push(product._id);
                    }
                } else {
                    wishlist.push(product._id);
                }
                profile.wishlist = wishlist;
            }
            await profile.save();
            return profile.wishlist;
        } catch (error) {
            throw new AppError('Unable Add To Wishlist', 500);
        }
    }
    async AddCartItem(customerId, product, quantity, isRemove) {
        try {
            const profile = await CustomerModel.findById(customerId).populate(
                'cart.product',
            );
            if (profile) {
                const cartItem = {
                    product,
                    unit: quantity,
                };

                let cartItems = profile.cart;
                if (cartItems.length > 0) {
                    let isExist = false;
                    cartItems.map((item) => {
                        if (
                            item.product._id.toString() ===
                            product._id.toString()
                        ) {
                            if (isRemove) {
                                cartItems.splice(cartItems.indexOf(item), 1);
                            } else {
                                item.unit = quantity;
                            }
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        cartItems.push(cartItem);
                    }
                } else {
                    cartItems.push(cartItem);
                }
                profile.cart = cartItems;
            }
            await profile.save();
            return profile.cart;
        } catch (error) {
            console.log(error.message);
            throw new AppError('Unable Add To Cart', 500);
        }
    }
}

module.exports = CustomerRepository;
