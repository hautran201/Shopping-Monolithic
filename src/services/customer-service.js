const ProductService = require('../services/product-service');

const CustomerRepository = require('../database/repository/customer-repository');
const {
    FormatedData,
    GenSalt,
    GeneratePassword,
    ValidatePassword,
    GenerateToken,
} = require('../utils');
const { AppError } = require('../utils/app-error');

class CustomerService {
    constructor() {
        this.repository = new CustomerRepository();
    }
    async SignUp(userInputs) {
        const { email, password, phone } = userInputs;
        try {
            const salt = await GenSalt(10);

            const passwordHash = await GeneratePassword(password, salt);

            const data = await this.repository.CreateCustomer({
                email,
                password: passwordHash,
                phone,
                salt,
            });

            return FormatedData(data);
        } catch (error) {}
    }

    async SignIn(userInputs) {
        const { email, password } = userInputs;

        try {
            const existingCustomer = await this.repository.FindCustomer({
                email,
            });
            if (existingCustomer) {
                const validPassword = await ValidatePassword(
                    password,
                    existingCustomer.password,
                    existingCustomer.salt,
                );
                if (validPassword) {
                    const token = await GenerateToken({
                        id: existingCustomer._id,
                        email: existingCustomer.email,
                    });
                    return FormatedData({ id: existingCustomer._id, token });
                }
            }
            return FormatedData(null);
        } catch (error) {
            throw new AppError('Invalid credentials', 500);
        }
    }

    async GetProfile(id) {
        try {
            const customerInfo = await this.repository.FindCustomerById({ id });
            return FormatedData(customerInfo);
        } catch (error) {
            console.log(error.message);
            throw new AppError('Data not found ', 404);
        }
    }

    async AddNewAddress(id, userInputs) {
        try {
            const { street, postalCode, city, country } = userInputs;
            const addressResult = await this.repository.CreateAddress({
                id,
                street,
                postalCode,
                city,
                country,
            });

            return FormatedData(addressResult);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async GetShopingDetails({ id }) {
        try {
            const existingCustomer = await this.repository.FindCustomerById({
                id,
            });
            return FormatedData(existingCustomer);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }

    async GetWishlist(customerId) {
        try {
            const wishlist = await this.repository.GetWishlist(customerId);

            return FormatedData(wishlist);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async AddToWishlist(userId, productId) {
        try {
            const product = await ProductService.GetProductById(productId);

            const wishlistResult = await this.repository.AddToWishlist(
                userId,
                product,
            );
            return FormatedData(wishlistResult);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async GetCartDetail(customerId) {
        try {
            const cartResult = await this.repository.GetCartDetail(customerId);
            return FormatedData(cartResult);
        } catch (error) {
            console.log(error.message);
            throw new AppError(error.message, 500);
        }
    }
    async ManagerCart(userId, productId, quantity, isRemove) {
        try {
            const product = await ProductService.GetProductById(productId);
            const cartResult = await this.repository.AddCartItem(
                userId,
                product,
                quantity,
                isRemove,
            );
            return FormatedData(cartResult);
        } catch (error) {
            console.error(error.message);
            throw new AppError(error.message, 500);
        }
    }
}

module.exports = new CustomerService();
