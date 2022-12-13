const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongodb connnected to ${conn.connection.host}`.green.underline
    );
  } catch (err) {
    console.log(`error occured ${err}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
