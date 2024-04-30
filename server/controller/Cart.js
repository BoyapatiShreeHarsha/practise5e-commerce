const { Cart } = require("../models/Cart");

async function addToCart(req, res) {
    try {
        const data = req.body;
        const newCart = new Cart(data);
        await newCart.save();
        res.status(200).json(newCart);

    } catch (error) {
        res.status(404).json({ data: "Not able to add Cart Item", message: error });
    }
}

async function getCartData(req, res, next) {
    try {
        let query = Cart.find({});
        if (req.query.user) {
            query = query.find({ user: req.query.user });
        }

        const docs = await query.exec();

        return res.status(200).json(docs);
    } catch (error) {
        next(error);
    }
}

async function updateCart(req, res, next) {
    try {
        let searchId = req.params.cartId;
        const newCartData = await Cart.findByIdAndUpdate(searchId, req.body, { new: true });
        if (!newCartData) {
            return res.status(404).json({ message: "This Cart Item is not present" });
        }

        return res.status(200).json(newCartData);

    } catch (error) {
        next(error);
    }
}

async function deleteItemFromCart(req, res, next) {
    try {
        let searchId = req.params.cartId;
        const deleteData = await Cart.findByIdAndDelete(searchId);
        if (!deleteData) {
            return res.status(404).json({ message: "This Cart Item is not present" });
        }
        return res.status(200).json(deleteData);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addToCart,
    getCartData,
    updateCart,
    deleteItemFromCart
}