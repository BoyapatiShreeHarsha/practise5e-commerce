const mongoose = require('mongoose');


const brandCategory = new mongoose.Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true },
});

const virtual = brandCategory.virtual('id');
virtual.get(function () {
    return this._id;
})
brandCategory.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const Brand = mongoose.model('Brands', brandCategory);

module.exports = {
    Brand
}
