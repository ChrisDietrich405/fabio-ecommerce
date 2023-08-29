const router = require("express").Router();
const { registerUser, login } = require("../controller/userController");

router.post("/", registerUser);
router.post("/login", login);

module.exports = router;
