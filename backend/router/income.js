const express = require("express");
const router = express.Router();
const { income, displayincome } = require("../controller/income");

// Add income
router.post("/", income);

// Get incomes (by user & month)
router.get("/", displayincome);

module.exports = router;