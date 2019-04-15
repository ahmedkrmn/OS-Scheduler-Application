const path = require("path");

module.exports = {
  entry: {
    FCFS: "./src/app/FCFS.js",
    SJF: "./src/app/SJF.js",
    NP_SJF: "./src/app/NP_SJF.js",
    Priority: "./src/app/Priority.js",
    NP_Priority: "./src/app/NP_Priority.js",
    RR: "./src/app/RR.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  }
  //! No need to transpile with Babel. We're using ES6 Modules here, but the code will run in the browser/Electron and not Node.
};
