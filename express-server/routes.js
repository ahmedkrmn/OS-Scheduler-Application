const router = require("express").Router();

router.get("/FCFS", (req, res) => {
  res.render("scheduler.ejs", {
    title: "FCFS Scheduling",
    header: "First Come First Serve Scheduling",
    script: "/FCFS.min.js",
    priority: false,
    quantum: 0
  });
});

router.get("/SJF", (req, res) => {
  res.render("scheduler.ejs", {
    title: "SJF Scheduling",
    header: "Preemptive Shortest Job First Scheduling",
    script: "/SJF.min.js",
    priority: false,
    quantum: 0
  });
});

router.get("/NP_SJF", (req, res) => {
  res.render("scheduler.ejs", {
    title: "NP-SJF Scheduling",
    header: "Non-Preemptive Shortest Job First Scheduling",
    script: "/NP_SJF.min.js",
    priority: false,
    quantum: 0
  });
});

router.get("/Priority", (req, res) => {
  res.render("scheduler.ejs", {
    title: "Priority Scheduling",
    header: "Preemptive Priority Scheduling",
    script: "/Priority.min.js",
    priority: true,
    quantum: 0
  });
});

router.get("/NP_Priority", (req, res) => {
  res.render("scheduler.ejs", {
    title: "NP-Priority Scheduling",
    header: "Non-Preemptive Priority Scheduling",
    script: "/NP_Priority.min.js",
    priority: true,
    quantum: 0
  });
});

router.get("/RR", (req, res) => {
  res.render("scheduler.ejs", {
    title: "RR Scheduling",
    header: "Round-Robin Scheduling",
    script: "/RR.min.js",
    priority: false,
    quantum: req.query.quantum
  });
});

module.exports = router;
