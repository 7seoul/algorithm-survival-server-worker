const { User } = require("../models/User/User");
const { userUpdateByScrap } = require("./userUpdate");
const logger = require("../../logger");

let userQueue = [];
let currentIndex = 0;
let isRunning = false;

const loadUsersFromDB = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    logger.error(`[AUTO] Error loading user:`, error.message);
    return [];
  }
};

const autoUpdate = async () => {
  if (userQueue.length === 0) {
    logger.info("[AUTO] No users to update.");
    scheduleNext();
    return;
  }

  const user = userQueue[currentIndex];
  logger.info(
    `[AUTO] User Queue: ${currentIndex + 1}/${userQueue.length} | Handle: "${
      user.handle
    }"`
  );

  try {
    await userUpdateByScrap(user.handle);
  } catch (error) {
    logger.error(`[AUTO] "${user.handle}" Error updating user:`, error.message);
  }

  currentIndex++;

  if (currentIndex >= userQueue.length) {
    logger.info("[AUTO] Completed one round of updates. Reloading users...");
    currentIndex = 0;
    userQueue = await loadUsersFromDB();

    if (!userQueue || userQueue.length === 0) {
      logger.warn("[AUTO] EMPTY QUEUE after reload! Retrying in 5s...");
      setTimeout(init, 5000);
      return;
    }

    logger.info(`[AUTO] Reloaded ${userQueue.length} users from DB.`);
  }

  scheduleNext();
};

const scheduleNext = () => {
  const delay = 30000 + Math.floor(Math.random() * 30000);
  setTimeout(autoUpdate, delay);
};

const startUpdating = () => {
  if (isRunning) return; // 중복 실행 방지
  isRunning = true;
  logger.info("[AUTO] User update process started!");
  autoUpdate(); // 첫 실행
};

const init = async () => {
  userQueue = await loadUsersFromDB();

  if (!userQueue || userQueue.length === 0) {
    logger.warn("[AUTO] EMPTY QUEUE after reload! Retrying in 5s...");
    setTimeout(init, 5000); // 5초 후 재시도
    return;
  }

  logger.info(`[AUTO] Loaded ${userQueue.length} users from DB.`);
  startUpdating();
};

module.exports = {
  init,
};
