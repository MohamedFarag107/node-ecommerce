const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./utils/database/dbConnection");

const PORT = process.env.PORT || 4000;
const app = express();

// setup env
dotenv.config({});

// database connection
dbConnection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
