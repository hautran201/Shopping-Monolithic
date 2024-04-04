const { AppError } = require('../../utils/app-error');
const { CustomerModel, AddressModel } = require('../models');

class CustomerRepository {
    async createCustomer({ email, password, phone, salt }) {
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
}

module.exports = CustomerRepository;
