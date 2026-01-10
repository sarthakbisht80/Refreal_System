const Candidate = require("../models/Candidate");
const { isValidEmail, isValidPhone } = require("../utils/validators");

exports.createCandidate = async (req, res) => {
  const { name, email, phone, jobTitle } = req.body;

  if (!isValidEmail(email) || !isValidPhone(phone)) {
    return res.status(400).json({ message: "Invalid email or phone" });
  }

  const candidate = await Candidate.create({
    name,
    email,
    phone,
    jobTitle,
    resumeUrl: req.file ? req.file.path : null,
    referredBy: req.user.id
  });

  res.status(201).json(candidate);
};

exports.getCandidates = async (req, res) => {
  const candidates = await Candidate.find({ referredBy: req.user.id });
  res.json(candidates);
};

exports.updateStatus = async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(candidate);
};

exports.deleteCandidate = async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: "Candidate deleted" });
};

exports.metrics = async (req, res) => {
  const total = await Candidate.countDocuments({ referredBy: req.user.id });
  const pending = await Candidate.countDocuments({ status: "Pending", referredBy: req.user.id });
  const reviewed = await Candidate.countDocuments({ status: "Reviewed", referredBy: req.user.id });
  const hired = await Candidate.countDocuments({ status: "Hired", referredBy: req.user.id });

  res.json({ total, pending, reviewed, hired });
};
