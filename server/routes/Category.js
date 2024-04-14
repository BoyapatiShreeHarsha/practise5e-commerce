const { Router } = require("express");
const { validateCategory } = require("../middleware/Category");
const { createCategory, getAllCategory } = require("../controller/Category");
const router = Router();

router.post("/", validateCategory, createCategory);
router.get("/", getAllCategory);


router.use(function (error, req, res, next) {
    res.status(500).json({ error: "Internal server Error in Category", message: error });
})


module.exports = router;