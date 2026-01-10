const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  jobTitle: String,
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Hired"],
    default: "Pending"
  },
  resumeUrl: String,
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Candidate", candidateSchema);
