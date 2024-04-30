const { Router } = require("express");
const { validCart } = require("../middleware/Cart");
const { addToCart, getCartData, updateCart, deleteItemFromCart } = require("../controller/Cart");
const router = Router();

router.post("/", validCart, addToCart);
router.get("/", getCartData);
router.patch("/:cartId", validCart, updateCart);
router.delete("/:cartId", deleteItemFromCart);

router.use(function (error, req, res, next) {
    res.status(500).json({ error: "Internal server Error in Cart", message: error });
})


module.exports = router;