const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true }
});

const virtual = ProductSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const Product = mongoose.model('Products', ProductSchema);

module.exports = {
    Product
}
