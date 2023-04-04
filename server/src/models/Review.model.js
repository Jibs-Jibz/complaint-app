const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema(
  {
    adminId: String,
    reply: String,
    complaintId: String,
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model("replies", repliesSchema);

module.exports = Reply;
