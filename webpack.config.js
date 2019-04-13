const path = require("path");
const env = require("yargs").argv.env;

module.exports = {
  mode: env === "prod" ? "production" : "development",
  entry: {
    FCFS: "./src/FCFS-UI.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: env === "prod" ? "[name].min.js" : "[name].js"
  }
  //! No need to transpile with Babel. We're using ES6 Modules here, but the code will run in the browser/Electron and not Node.
};
