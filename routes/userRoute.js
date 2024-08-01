const express = require("express");
const router = express.Router();
const {registerUser, loginUser, findUserById, getUsers} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", findUserById);
router.get("/", getUsers);

module.exports = router;