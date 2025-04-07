const axios = require("axios");
const logger = require("../../logger");

const scrapBoj = async (handle) => {
  try {
    return await axios.get(encodeURI(`https://www.acmicpc.net/user/${handle}`));
  } catch (error) {
    logger.error("Failed to Boj data:", error);
    throw new Error("Invalid data");
  }
};

module.exports = {
  scrapBoj,
};
