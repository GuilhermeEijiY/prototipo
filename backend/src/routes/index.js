const express = require("express");

const { healthCheck } = require("../controllers/healthController");
const { simulateComparison } = require("../controllers/simulationController");

const router = express.Router();

router.get("/", healthCheck);
router.post("/api/simulate", simulateComparison);

module.exports = router;
