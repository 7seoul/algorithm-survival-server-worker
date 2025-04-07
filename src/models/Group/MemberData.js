const mongoose = require("mongoose");

const memberDataSchema = mongoose.Schema({
  name: {
    type: String,
  },
  handle: {
    type: String,
    required: true,
  },
  downs: {
    type: Number,
    default: 0,
  },
  initialStreak: {
    type: Number,
    default: 0,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  initialSolved: {
    type: Number,
    default: 0,
  },
  currentSolved: {
    type: Number,
    default: 0,
  },
});

const MemberData = mongoose.model("MemberData", memberDataSchema);

module.exports = { MemberData };
