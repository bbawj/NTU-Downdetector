const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    productionURL: "",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
