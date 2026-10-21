const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/users", require("./routes/users.routes"));


app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

module.exports = app;