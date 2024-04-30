const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pinCode: String
});

const orderSchema = new Schema({
    items: [Schema.Types.Mixed],
    totalAmount: Number,
    totalItems: Number,
    user: { type: Schema.Types.Mixed },
    paymentMethod: String,
    selectedAddress: addressSchema,
    status: String
});

const virtual = orderSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

const Order = mongoose.model('Orders', orderSchema);

module.exports = {
    Order
}