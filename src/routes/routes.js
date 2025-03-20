
const express = require("express");
const router = express.Router();
const healthCheckController = require("../controllers/healthcheckController");
const rankController = require("../controllers/rankController");
router.get("/health-check", healthCheckController.HealthCheck);

// set valorant id api
router.get("/valorant/set-ign", rankController.setRank);

// get valorant rank by ign
router.get("/valorant/get-rank-by-ign", rankController.getRankByIGN);

// get valorant rank by yt-userid
router.get("/valorant/get-rank-by-userid", rankController.getRankByUserId);

module.exports = router;
