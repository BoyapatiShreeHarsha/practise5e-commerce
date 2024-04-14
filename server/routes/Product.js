const { Router } = require("express");
const router = Router();
const { validProduct } = require("../middleware/Product");
const { createProduct, updateProduct, fetchProduct, fetchProductsByFilters } = require("../controller/Product");

router.post("/", validProduct, createProduct);
router.patch("/:productId", validProduct, updateProduct);
router.get("/:productId", fetchProduct);
router.get("/", fetchProductsByFilters);




router.use(function (error, req, res, next) {
    res.status(500).json({ error: "Internal server Error in Products", message: error });
})


module.exports = router;