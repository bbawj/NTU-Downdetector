const express = require("express");

const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welecome to NTU Downdetector."});
});

app.get("/api", (req, res) => {
  res.json({ message: "Welecome to NTU Downdetector API."});
});

require("./app/routes/provider.routes.js")(app);

// set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
