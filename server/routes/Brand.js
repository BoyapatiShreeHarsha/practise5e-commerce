const { Router } = require("express");
const router = Router();
const { validateBrand } = require("../middleware/Brand");
const { createBrand, getAllBrand } = require("../controller/Brand");


router.post("/", validateBrand, createBrand);
router.get("/", getAllBrand);

router.use(function (error, req, res, next) {
    res.status(500).json({ error: "Internal server Error in Brand", message: error });
})


module.exports = router;