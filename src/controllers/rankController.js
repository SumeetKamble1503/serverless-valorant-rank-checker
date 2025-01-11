// src/controllers/rankController.js
const { RankService } = require("../services/rankService");

// Controller for getting the rank of a user
exports.getRank = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const rank = await RankService.getRank(username);
    return res.status(200).json({ username, rank });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Controller for setting a user's rank
exports.setRank = async (req, res) => {
  const { username, rank } = req.body;

  if (!username || !rank) {
    return res.status(400).json({ message: "Username and rank are required" });
  }

  try {
    const result = await RankService.setRank(username, rank);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
