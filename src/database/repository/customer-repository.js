const { CustomerModel } = require('../models');

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
}

module.exports = CustomerRepository;
