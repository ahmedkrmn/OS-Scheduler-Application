let Chart;
function userInterface(chart) {
  Chart = chart;
}
module.exports = userInterface;

let current_process = 1,
  totalTime = 0,
  processes = [];

const processNameField = document.getElementById("process_name"),
  arrivalTimeField = document.getElementById("arrival_time"),
  burstTimeField = document.getElementById("burst_time"),
  priorityField = document.getElementById("priority"),
  tbody = document.getElementById("tbody"),
  form = document.querySelector(".form"),
  separator = document.getElementById("separate"),
  avgWaitingField = document.getElementById("avg-waiting"),
  totalWaitingField = document.getElementById("total-waiting");

const urlParams = new URLSearchParams(window.location.search);
const quantum = parseInt(urlParams.get("quantum"));

tbody.addEventListener("click", deleteProcess);
form.addEventListener("submit", addProcess);

function deleteProcess(e) {
  if (e.target.classList.contains("fa-times")) {
    let processName;
    if (priorityField)
      processName = parseInt(
        e.target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent
      );
    else
      processName = parseInt(
        e.target.parentElement.previousElementSibling.previousElementSibling
          .textContent
      );
    for (let i = processName; i < processes.length; i++) processes[i][0]--;
    processes.splice(processName - 1, 1);
    current_process--;
    processNameField.placeholder = `Process Name: ${current_process}`;
    regenerateTable();
  }
}

function regenerateTable() {
  document.getElementById("chart").remove();
  tbody.innerHTML = "";
  processes.forEach(process => {
    const tr = document.createElement("tr");

    if (priorityField)
      tr.innerHTML = `<td>${process[0]}</td><td>${process[1]}</td><td>${
        process[2]
      }</td><td>${
        process[3]
      }<i class="fas fa-times right" title="Delete process"></i></td>`;
    else
      tr.innerHTML = `<td>${process[0]}</td><td>${process[1]}</td><td>${
        process[2]
      }<i class="fas fa-times right" title="Delete process"></i></td>`;

    tbody.appendChild(tr);
  });
  if (processes.length) generateChart();
  else {
    totalWaitingField.style = "display:none";
    separator.style = "display:none";
    avgWaitingField.style = "display:none";
  }
}

function generateChart() {
  if (document.getElementById("chart"))
    document.getElementById("chart").remove();

  const chartDiv = document.createElement("div");
  chartDiv.id = "chart";
  document.getElementById("chart-container").appendChild(chartDiv);

  const ganttChart = new Chart(processes, chartDiv, quantum);
  //* Javascript isn't strict when it comes to passed arguments. "quantum" will be ignored if the schedulers isn't RR

  const totalWaiting = ganttChart.generate();

  //* Re-scale the body if the graph starts to get wider
  if (totalTime * 35 > screen.width)
    document.body.style.width = `${totalTime * 35}px`;

  //* Show the total and average waiting time after a 25 msec delay to match the chart delay
  setTimeout(() => {
    separator.style = "";

    avgWaitingField.style = "float: right";
    avgWaitingField.innerText = `Average Waiting Time: ${(
      totalWaiting / processes.length
    ).toFixed(3)}`;

    totalWaitingField.style = "float: left";
    totalWaitingField.innerText = `Total Waiting Time: ${totalWaiting}`;
  }, 25);

  ganttChart.render();

  //* Scroll to the bottom left to see the chart from the beginning
  // window.scrollTo(0, document.body.scrollHeight);

  //* Scroll to chart center
  chartDiv.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center"
  });
}

function addProcess(e) {
  e.preventDefault();

  let arrivalTime = parseInt(arrivalTimeField.value),
    burstTime = parseInt(burstTimeField.value),
    priority;

  arrivalTimeField.value = "";
  burstTimeField.value = "";

  if (priorityField) {
    priority = Math.abs(parseInt(priorityField.value));
    priorityField.value = "";
  }

  const tr = document.createElement("tr");

  if (priorityField)
    tr.innerHTML = `<td>${current_process}</td><td>${arrivalTime}</td><td>${burstTime}</td><td>${priority}<i class="fas fa-times right" title="Delete process"></i></td>`;
  else
    tr.innerHTML = `<td>${current_process}</td><td>${arrivalTime}</td><td>${burstTime}<i class="fas fa-times right" title="Delete process"></i></td>`;

  tbody.appendChild(tr);

  if (priorityField)
    processes.push([current_process, arrivalTime, burstTime, priority]);
  else processes.push([current_process, arrivalTime, burstTime]);

  current_process++;
  totalTime += burstTime;
  processNameField.placeholder = `Process Name: ${current_process}`;
  generateChart();
}
