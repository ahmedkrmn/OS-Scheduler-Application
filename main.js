const electron = require("electron");
const path = require("path");
const url = require("url");

// SET ENV
process.env.NODE_ENV = "production";

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for app to be ready
app.on("ready", function() {
  // Create new window
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    title: "OS Scheduling Application"
  });
  // Load html in window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // Quit app when closed
  mainWindow.on("closed", function() {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
  {
    label: "View",
    submenu: [
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { role: "togglefullscreen" }
    ]
  },
  {
    label: "Reset",
    role: "reload"
  }
];

// If OSX, add empty object to menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
