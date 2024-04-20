const ProductRepository = require('../database/repository/product-repository');
const { FormatedData } = require('../utils');
const { AppError } = require('../utils/app-error');

class ProductService {
    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateNewProduct(productInputs) {
        try {
            const data = await this.repository.CreateProduct(productInputs);
            return FormatedData(data);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async GetProductById(productId) {
        try {
            const product = await this.repository.FindById(productId);
            return product;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async GetProductByCategory(type) {
        try {
            const products = await this.repository.FindByCategory(type);
            return FormatedData(products);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async GetAllProduct() {
        try {
            const products = await this.repository.FindAllProducts();
            return FormatedData(products);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
}

module.exports = new ProductService();
