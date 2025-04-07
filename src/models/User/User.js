const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      minlength: 4,
    },
    joinedGroupList: [
      {
        type: Number,
        ref: "Group",
      },
    ],
    maxStreak: {
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
    score: {
      type: Number,
      default: 0,
    },
    tier: {
      type: Number,
      default: 0,
    },
    imgSrc: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.index({ score: -1 });
userSchema.index({ maxStreak: -1 });

const User = mongoose.model("User", userSchema);

module.exports = { User };
