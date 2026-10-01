const express = require("express");

const {
    createCarbonRecord
} = require("../controllers/carbonController");

const protect =
    require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE CARBON RECORD
// ==========================================

router.post(
    "/",
    protect,
    createCarbonRecord
);

module.exports = router;