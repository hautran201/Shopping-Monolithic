const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true },
        name: { type: String },
        phone: { type: String },
        salt: String,
        address: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'address',
                require: true,
            },
        ],
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    require: true,
                },
                unit: {
                    type: Number,
                    require: true,
                },
            },
        ],
        whishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                require: true,
            },
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'order',
                require: true,
            },
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

module.exports = mongoose.model('customer', CustomerSchema);
