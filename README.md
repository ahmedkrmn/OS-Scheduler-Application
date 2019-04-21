# OS Scheduler Application

An Electron application for simulating major operating system scheduling algorithms.

The app uses EJS templates, and Express. The core app (scheduling algorithms) is written in JavaScript.

An old version of the app uses HTML instead of EJS and Express, but there was a separate HTML page for each algorithm page which were identical for the most part except the titles and some minor changes in the tables so I thought having a new version using EJS and Express is more convenient. 

## Application Features

- Simulate the execution of the most well known OS scheduling algorithms, the app contains the following algorithms:
  - First Come First Serve
  - Shortest Job First - Preemptive
  - Shortest Job First - Non Preemptive
  - Priority - Preemptive
  - Priority - Non Preemptive
  - Round Robin
- Real time simulation, no need to refill the process table to add a process
- Remove a process and re-simulate with one click

## How To Get The App

### Run The Latest Packaged Version

A windows x64 build of the application can be found in the repo releases. If you want to package the app for a different operating system or you want to tinker with the code locally, skip to the build from source section.

### Build From Source

Make sure you have Node.js installed then follow the steps below.

1. Fork the repo or download the current branch as a zip file
2. `cd` into the project directory and run `npm install`
3. For x64 architecture, to package the app, run :
   - `npm run package:linux` for linux
   - `npm run package:win` for windows
   - `npm run package:mac` for mac

