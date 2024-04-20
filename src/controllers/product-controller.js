const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const { AppError } = require('../utils/app-error');

module.exports = {
    CreateProduct: async (req, res, next) => {
        try {
            const {
                name,
                desc,
                banner,
                type,
                unit,
                price,
                available,
                supplier,
            } = req.body;
            const newProduct = await ProductService.CreateNewProduct({
                name,
                desc,
                banner,
                type,
                unit,
                price,
                available,
                supplier,
            });
            res.status(201).json(newProduct);
        } catch (error) {
            next(new AppError(error));
        }
    },
    GetProduct: async (req, res, next) => {
        try {
            const id = req.params.id;

            const data = await ProductService.GetProductById(id);

            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    GetProductByCategory: async (req, res, next) => {
        try {
            const type = req.params.type;

            const data = await ProductService.GetProductByCategory(type);

            res.status(201).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
    GetAllProducts: async (req, res, next) => {
        try {
            const data = await ProductService.GetAllProduct();
            res.status(200).json(data);
        } catch (error) {
            next(new AppError(error.message, 500));
        }
    },
};
