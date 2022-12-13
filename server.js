const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colrs = require("colors");
const morgan = require("morgan");

const userRoutes = require("./routes/user.route");

const { errorHandler } = require("./middlewares/error.middleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.yellow.bold);
});
