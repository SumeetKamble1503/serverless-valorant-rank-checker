const express = require("express");
const router = express.Router();
const healthCheckController = require("../controllers/healthcheckController");
const rankController = require("../controllers/rankController");

router.get("/health-check", healthCheckController.HealthCheck);

// rank apis

// set valorant id api
router.get("/valorant/set-ign", rankController.setRank);

// get valorant rank by ign
router.get("/valorant/get-rank-by-ign", rankController.getRank);

// get valorant rank by yt-userid

// //whatsapp callback
// router.get(
//   "/whatsapp/webhook/callback",
//   whatsappController.getWhatsAppCallback
// );
// router.post(
//   "/whatsapp/webhook/callback",
//   whatsAppCallbackController.whatsAppCallback
// );

module.exports = router;
