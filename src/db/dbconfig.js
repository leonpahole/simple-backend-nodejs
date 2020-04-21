require("dotenv").config();
const fs = require("fs");

if (process.env.DB_USERNAME_FILE) {
  process.env.DB_USERNAME = fs.readFileSync(
    process.env.DB_USERNAME_FILE,
    "utf8"
  );
}

if (process.env.DB_PASSWORD_FILE) {
  process.env.DB_PASSWORD = fs.readFileSync(
    process.env.DB_PASSWORD_FILE,
    "utf8"
  );
}

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
};
