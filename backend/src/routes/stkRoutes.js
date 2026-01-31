const express = require("express");
const router = express.Router();

const generateToken = require("../middlewares/generateToken");
const { stkPush, stkCallback } = require("../controllers/stkController");

router.post("/stkpush", generateToken, stkPush);
router.post("/callback", stkCallback);

module.exports = router;
