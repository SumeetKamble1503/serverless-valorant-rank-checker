import { RankService } from "../services/rankService.js";

// Controller for getting the rank of a user
export async function getRankByIGN(req, res) {
  const ign = req.query?.ign || null;
  console.log("ign", ign);
  if (!ign) {
    return res.status(400).json("Valorant IGN is required like Tenz#777");
  }
  try {
    const rank = await RankService.fetchRank(ign);
    return res.status(200).json(rank?.rank);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
}

export async function getRankByUserId(req, res) {
  const userId = req.query?.user_id;
  console.log("userId", userId);
  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }
  try {
    const rank = await RankService.getRank(userId);
    return res.status(200).json(rank);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
}

// Controller for setting a user's rank

export async function setRank(req, res) {
  const ign = req.query?.user_name;
  const userId = req.query?.user_id;
  console.log("ign", ign);
  console.log("userId", userId);
  if (!ign || !userId) {
    return res
      .status(400)
      .json({ message: "In Game Name and User Id are required" });
  }
  try {
    const result = await RankService.setRank(userId, ign);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

// export default { setRank, getRankByIGN, getRankByUserId };
