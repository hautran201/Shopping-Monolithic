const { AppError } = require('../../utils/app-error');
const { ProductModel } = require('../models');

class ProductRepository {
    async CreateProduct({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        available,
        supplier,
    }) {
        try {
            const product = new ProductModel({
                name,
                desc,
                banner,
                type,
                unit,
                price,
                available,
                supplier,
            });
            const productResult = await product.save();
            return productResult;
        } catch (error) {
            console.log(error.message);
            throw new AppError(error.message, 500);
        }
    }
    async FindById(id) {
        try {
            const product = await ProductModel.findById(id);
            return product;
        } catch (error) {
            console.log(error.message);
            throw new AppError(error.message, 500);
        }
    }
    async FindByCategory(type) {
        try {
            const products = await ProductModel.find({
                type: { $regex: type, $options: 'i' },
            });
            return products;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
    async FindAllProducts() {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }
}

module.exports = ProductRepository;
