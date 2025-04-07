const axios = require("axios");
const logger = require("../../logger");

const profile = async (handle) => {
  try {
    const response = await axios.get("https://solved.ac/api/v3/user/show", {
      params: {
        handle: handle,
      },
    });

    const profile = response.data;

    return profile;
  } catch (error) {
    logger.error("Failed to profile:", error);
    throw new Error("Invalid data");
  }
};

const problem = async (handle, grade) => {
  try {
    const response = await axios.get(
      "https://solved.ac/api/v3/user/problem_stats",
      {
        params: {
          handle: handle,
        },
      }
    );
    const problems = response.data;
    let cnt = 0;
    for (let i = grade; i < problems.length; i++) {
      cnt += problems[i].solved;
    }

    return cnt;
  } catch (error) {
    logger.error("Failed to problem:", error);
    throw new Error("Invalid data");
  }
};

const grass = async (handle) => {
  try {
    const response = await axios.get("https://solved.ac/api/v3/user/grass", {
      params: {
        handle: handle,
        topic: "today-solved",
      },
    });

    const currentStreak = response.data.currentStreak;

    return currentStreak;
  } catch (error) {
    logger.error("Failed to problem:", error);
    throw new Error("Invalid data");
  }
};

module.exports = {
  profile,
  problem,
  grass,
};
