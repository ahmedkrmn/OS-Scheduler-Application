import generateChart from "../helpers/generateChart";
import userInterface from "../helpers/userInterface";
import clone from "clone";

class Chart {
  constructor(processes, chartDiv) {
    //! Deep clone the processes array
    this.processes = clone(processes);

    this.chartDiv = chartDiv;
  }
  generate() {
    let scheduler = [],
      totalWaiting = 0;

    //* Loop until you extract all the processes
    while (this.processes.length) {
      this.processes.sort((a, b) => {
        //* Sort by arrival time then priority
        if (a[1] != b[1]) return a[1] - b[1];
        else return a[3] - b[3];
      });

      //* Extract the highest priority process from the list on a unit-time basis and add it to the final scheduler list that is to be drawn on the chart
      let shortestProcess;
      //* If the burst time of the process = 1, extract it right away
      if (this.processes[0][2] == 1) shortestProcess = this.processes.shift();
      //* else consume 1 second of the process, add it in the scheduler and leave the rest of the process in the list
      else {
        let [processName, arrivalTime, burstTime, priority] = [
          ...this.processes[0]
        ];
        shortestProcess = [processName, arrivalTime, 1, priority];
        this.processes[0] = [
          processName,
          arrivalTime + 1,
          burstTime - 1,
          priority
        ];
      }
      scheduler.push(shortestProcess);

      //* Add the execution time of the highest priority process to all the other processes
      this.processes.forEach(process => {
        if (shortestProcess[1] + shortestProcess[2] > process[1]) {
          totalWaiting += shortestProcess[1] + shortestProcess[2] - process[1];
          process[1] = shortestProcess[1] + shortestProcess[2];
        }
      });
    }

    this.chart = generateChart(scheduler, this.chartDiv);
    return totalWaiting;
  }

  render() {
    this.chart.render();
  }
}

userInterface(Chart);
