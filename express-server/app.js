const express = require("express");
const routes = require("./routes");
const path = require("path");

function runServer() {
  const app = express();

  app.use(express.static(path.join(__dirname, "../assets")));
  app.use(express.static(path.join(__dirname, "../build")));

  app.set("views", path.join(__dirname, "../src/views"));
  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../mainWindow.html"));
  });
  app.use("/", routes);

  const PORT = 3000;

  app.listen(PORT);
}

module.exports = runServer;
