const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    quantity: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});

const virtual = CartSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
CartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const Cart = mongoose.model('Carts', CartSchema);

module.exports = {
    Cart
}