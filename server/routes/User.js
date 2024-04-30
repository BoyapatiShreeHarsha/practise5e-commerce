const { Router } = require("express");
const { validUser } = require("../middleware/User");
const { createUser, checkUser, updateUser } = require("../controller/User");
const router = Router();

router.post("/", validUser, createUser);
router.get("/", checkUser);
router.patch("/:userId", validUser, updateUser)


router.use(function (error, req, res, next) {
    res.status(500).json({ error: "Internal server Error in Users", message: error });
})


module.exports = router;