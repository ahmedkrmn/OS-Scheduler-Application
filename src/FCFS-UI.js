import DrawChart from "./FCFS-ALG";

let current_process = 1;
let processes = [];
const processNameField = document.getElementById("process_name"),
  arrivalTimeField = document.getElementById("arrival_time"),
  burstTimeField = document.getElementById("burst_time"),
  tbody = document.getElementById("tbody");

processNameField.placeholder = `Process Name: ${current_process}`;

const form = document.querySelector(".form");
form.addEventListener("submit", e => {
  e.preventDefault();

  const arrivalTime = Math.abs(parseInt(arrivalTimeField.value)),
    burstTime = Math.abs(parseInt(burstTimeField.value));
  arrivalTimeField.value = "";
  burstTimeField.value = "";

  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${current_process}</td><td>${arrivalTime}</td><td>${burstTime}</td>`;
  tbody.appendChild(tr);

  processes.push([current_process, arrivalTime, burstTime]);
  current_process++;
  processNameField.placeholder = `Process Name: ${current_process}`;

  document.getElementById("chart").remove();

  const chartDiv = document.createElement("div");
  chartDiv.id = "chart";
  document.getElementById("chart-container").appendChild(chartDiv);

  const Chart = new DrawChart(processes, chartDiv);

  const [avgWaiting, totalTime] = Chart.generate();

  if (totalTime * 35 > screen.width)
    document.body.style.width = `${totalTime * 35}px`;

  document.getElementById(
    "avg-waiting"
  ).innerText = `Average Waiting Time: ${avgWaiting}`;

  Chart.render();
});
