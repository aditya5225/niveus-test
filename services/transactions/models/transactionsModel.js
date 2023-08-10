const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'UserId id is required!'],
        trim: true,
        minLength: [3, `UserId id should be atleast 3 charector!`],
        maxLength: [20, `UserId id should less then 20 charector!`],
        ref: 'user'
    },
    amount: { type: Number, default: 0, trim: true },
    totalAmount: { type: Number, default: 0, trim: true },
    quantity: { type: Number, default: 0, trim: true },
    status: { type: Number, default: 0, trim: true },       // 0: Pending, 1: Success, 3: Failed
    charges: [{
        charges_name: { type: String, default: '', trim: true },
        charges_desc: { type: String, default: '', trim: true },
        item_amount: { type: Number, default: 0, trim: true },
    }],
    item_debt: {
        itemId: { type: String, default: '', trim: true },
        item_name: { type: String, default: '', trim: true },
        item_price: { type: Number, default: 0, trim: true },
        item_image: { type: Number, default: 0, trim: true },
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('transaction', transactionSchema)