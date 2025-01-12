// src/controllers/rankController.js
const { RankService } = require("../services/rankService");

// Controller for getting the rank of a user
exports.getRankByIGN = async (req, res) => {
  const ign = req.query?.ign || null;
  if (!ign) {
    return res.status(400).json("Valorant IGN is required like Tenz#777");
  }
  try {
    const rank = await RankService.fetchRank(ign);
    return res.status(200).json(rank?.rank);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

exports.getRankByUserId = async (req, res) => {
  const userId = req.query?.user_id;
  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }
  try {
    const rank = await RankService.getRank(userId);
    return res.status(200).json(rank);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// Controller for setting a user's rank
exports.setRank = async (req, res) => {
  const ign = req.query?.user_name;
  const userId = req.query?.user_id;
  if (!ign || !userId) {
    return res
      .status(400)
      .json({ message: "In Game Name and User Id are required" });
  }
  try {
    const result = await RankService.setRank(userId, ign);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
