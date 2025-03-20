import { Router } from "express";
const router = Router();
import { HealthCheck } from "../controllers/healthcheckController.js";
import {
  setRank,
  getRankByIGN,
  getRankByUserId,
} from "../controllers/rankController.js";
router.get("/health-check", HealthCheck);

// set valorant id api
router.get("/valorant/set-ign", setRank);

// get valorant rank by ign
router.get("/valorant/get-rank-by-ign", getRankByIGN);

// get valorant rank by yt-userid
router.get("/valorant/get-rank-by-userid", getRankByUserId);

export default router;
