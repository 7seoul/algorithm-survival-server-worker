const mongoose = require("mongoose");

const userVerificationSchema = mongoose.Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  verificationCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
});

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);

module.exports = { UserVerification };
