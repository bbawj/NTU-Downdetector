const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    productionURL: "https://ntu-downdetector.vercel.app",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
