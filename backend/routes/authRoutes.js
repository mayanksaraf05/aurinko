const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/callback", authController.handleCallback);

module.exports = router;
