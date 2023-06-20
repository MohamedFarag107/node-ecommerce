const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("mongo db connected");
  } catch (error) {
    console.log({ error });
  }
};

module.exports = dbConnection;
