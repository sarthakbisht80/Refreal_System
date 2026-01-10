const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const candidateRoutes = require("./routes/candidate.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/candidates", candidateRoutes);

module.exports = app;
