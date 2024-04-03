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

            const data = await this.repository.createCustomer({
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
}

module.exports = new CustomerService();
