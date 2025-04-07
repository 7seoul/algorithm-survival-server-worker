const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./logger");
const autoUpdate = require("./src/services/autoUpdate");
const { initGroupResetJob } = require("./src/scheduler/groupReset");

dotenv.config();

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    logger.info("Connected to MongoDB");

    // 유저 정보 자동 업데이트
    autoUpdate.init();
    // 06시 그룹 초기화
    initGroupResetJob();
  })
  .catch((e) => logger.error("MongoDB error: ", e));
