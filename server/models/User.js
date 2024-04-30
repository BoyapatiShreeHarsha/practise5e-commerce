const mongoose = require('mongoose');

// what so ever extra data is, it is not being taken
const addressSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pinCode: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: [addressSchema],
    uname: String,
    role: {
        type: String,
        default: 'user'
    }
});
const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const User = mongoose.model('Users', userSchema);

module.exports = {
    User
}
