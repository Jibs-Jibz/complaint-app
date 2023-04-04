const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: mongoose.SchemaTypes.objectId,
    complaint: String,
    isReviewed: {
      type: Boolean,
      default: false,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("complaints", complaintSchema);

module.exports = Complaint;
