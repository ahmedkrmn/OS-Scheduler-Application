function userInterface(Chart) {
  let current_process = 1,
    totalTime = 0,
    processes = [];
  const processNameField = document.getElementById("process_name"),
    arrivalTimeField = document.getElementById("arrival_time"),
    burstTimeField = document.getElementById("burst_time"),
    priorityField = document.getElementById("priority"),
    tbody = document.getElementById("tbody");

  processNameField.placeholder = `Process Name: ${current_process}`;

  const form = document.querySelector(".form");
  form.addEventListener("submit", displayChart);

  function displayChart(e) {
    e.preventDefault();

    const arrivalTime = Math.abs(parseInt(arrivalTimeField.value)),
      burstTime = Math.abs(parseInt(burstTimeField.value)),
      priority = Math.abs(parseInt(priorityField.value));
    arrivalTimeField.value = "";
    burstTimeField.value = "";
    priorityField.value = "";

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${current_process}</td><td>${arrivalTime}</td><td>${burstTime}</td><td>${priority}</td>`;
    tbody.appendChild(tr);

    processes.push([current_process, arrivalTime, burstTime, priority]);
    current_process++;
    totalTime += burstTime;
    processNameField.placeholder = `Process Name: ${current_process}`;

    document.getElementById("chart").remove();

    const chartDiv = document.createElement("div");
    chartDiv.id = "chart";
    document.getElementById("chart-container").appendChild(chartDiv);

    const ganttChart = new Chart(processes, chartDiv);

    const avgWaiting = ganttChart.generate();

    //* Re-scale the body if the graph starts to get wider
    if (totalTime * 35 > screen.width)
      document.body.style.width = `${totalTime * 35}px`;

    setTimeout(() => {
      document.getElementById("separate").style = "";

      document.getElementById(
        "avg-waiting"
      ).innerText = `Average Waiting Time: ${(
        avgWaiting / processes.length
      ).toFixed(3)}`;

      document.getElementById(
        "total-waiting"
      ).innerText = `Total Waiting Time: ${avgWaiting}`;
    }, 25);

    ganttChart.render();

    //* Scroll to the bottom left to see the chart from the beginning
    window.scrollTo(0, document.body.scrollHeight);
  }
}

export default userInterface;
