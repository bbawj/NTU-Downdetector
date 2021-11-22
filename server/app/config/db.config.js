const path = require("path");
require("dotenv").config({ path: `${__dirname}/.env.local` });

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: "ntudowndetector",
};
