const { Router } = require("express");
const { validOrder } = require("../middleware/Order");
const { createOrder, updateOrder, fetchAllOrders, fetchByUser } = require("../controller/Order");

const router = Router();

router.post("/", validOrder, createOrder);
router.patch("/:orderId", validOrder, updateOrder);
router.get("/", fetchAllOrders);
router.get("/user", fetchByUser)


router.use(function (error, req, res, next) {
    res.status(500).json({ error: "Internal server Error in Users", message: error });
})


module.exports = router;