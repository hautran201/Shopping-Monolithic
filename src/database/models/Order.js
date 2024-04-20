const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        customerId: String,
        amount: Number,
        status: String,
        txnId: String,
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    require: true,
                },
                unit: { type: Number, require: true },
            },
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

module.exports = mongoose.model('order', OrderSchema);
