import MongoManager from "../utils/mongoManager.js";
import axios from "axios";

// Define the RankService object
const RankService = {
  // This function simulates fetching a rank based on the username
  async fetchRank(ign) {
    let originalIGN = ign;
    if (!ign) {
      return {
        status: false,
        rank: "In Game Name is required to fetch Valorant Rank Details",
      };
    } else {
      let valorantUrl = process.env.VALORANT_API_ENDPOINT;
      ign = ign.replace("#", "/");
      valorantUrl += ign + "?onlyRank=true";
      let apiHeaders = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
        console.log("valorant headers",apiHeaders,"valorant url",valorantUrl);
        let currRank = await axios.get(valorantUrl, apiHeaders);
        console.log("Valorant api response : ",currRank);
        if (currRank?.data === "Either you entered an incorrect username or there could be some error with the backend. You can track the status on bit.ly/henrikapistatus"){
          return {
            status: false,
            rank: "Error [" + originalIGN + "] - " + "Either you entered an incorrect username or there could be some error with the backend",
          };
        }
        else{

          
          return {
            status: false,
            rank: "Current Rank of player [" + originalIGN + "] - " + currRank?.data,
          };
        }
      } catch {
        return {
          status: false,
          rank: `Error - Cannot fetch rank details for ${ign}. Either ign is incorrect or there is some server issue`,
        };
      }
    }
  },

  async getRank(user_id = null) {
    if (user_id) {
      const myQuery = {
        user_id: user_id,
      };
      const mongoCoreWorkspaceDb = new MongoManager(global.workspaceId);
      await mongoCoreWorkspaceDb.init();
      let rankObj = await mongoCoreWorkspaceDb.find_one("valorant", myQuery);
      await mongoCoreWorkspaceDb.close();
      let ign = rankObj?.in_game_name;
      let rank = await this.fetchRank(ign);
      if (rank?.status) {
        const match = rank?.rank.match(/- (.+)/);
        const extractedRank = match ? match[1] : null;
        const updateQuery = {
          last_updated_rank: extractedRank,
        };
        await mongoCoreWorkspaceDb.init();
        await mongoCoreWorkspaceDb.update_one("valorant", myQuery, updateQuery);
        await mongoCoreWorkspaceDb.close();
        return `${rank?.rank}`;
      } else {
        if(rankObj?.last_updated_rank != null){
          return `Couldn't fetch Current Rank. Last Updated rank in the system of player [${rankObj?.in_game_name}] - ${rankObj?.last_updated_rank}`;
        }
        return rank?.rank;
      }
    } else {
      return "Valorant In game name is not configured. Please set your ign by using !set or command set by your ";
    }
  },

  // This function simulates setting a rank for a user (could be stored in a database)
  async setRank(userId, ign) {
    // Simulate storing the rank (this would typically be a DB call)
    let myQuery = {
      user_id: userId,
    };
    let updateData = {
      user_id: userId,
      in_game_name: ign,
      last_updated_rank: null,
    };
    const mongoCoreWorkspaceDb = new MongoManager(global.workspaceId);
    await mongoCoreWorkspaceDb.init();
    await mongoCoreWorkspaceDb.update_one(
      "valorant",
      myQuery,
      updateData,
      true
    );
    await mongoCoreWorkspaceDb.close();
    return `Valorant ign set to ${ign}`;
  },
};

// Export RankService object
export { RankService };
