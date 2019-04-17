import generateChart from "../helpers/generateChart";
import userInterface from "../helpers/userInterface";
import clone from "clone";

class Chart {
  constructor(processes, chartDiv, quantum) {
    //! Deep clone the processes array
    this.processes = clone(processes);
    this.quantum = quantum;
    this.chartDiv = chartDiv;
  }
  generate() {
    let scheduler = [],
      totalWaiting = 0;

    this.processes.sort((a, b) => {
      //* Sort by arrival time then process name
      if (a[1] != b[1]) return a[1] - b[1];
      return a[0] - b[0];
    });

    //* Loop until you extract all the processes
    while (this.processes.length) {
      let shortestProcess, processName, arrivalTime, burstTime;

      //* If the burst time of the process <= quantum, extract it right away
      if (this.processes[0][2] <= this.quantum) {
        shortestProcess = this.processes.splice(0, 1)[0]; //! splice() returns the element wrapped in a list
      } else {
        //* else consume "quantuam" seconds of the process
        [processName, arrivalTime, burstTime] = [...this.processes[0]];
        shortestProcess = [processName, arrivalTime, this.quantum];

        //*Remove it from the list
        this.processes.splice(0, 1);
      }

      //*Add the execution time of the latest added scheduler process to all the other processes
      let i;
      for (i = 0; i < this.processes.length; i++) {
        if (shortestProcess[1] + shortestProcess[2] >= this.processes[i][1]) {
          totalWaiting +=
            shortestProcess[1] + shortestProcess[2] - this.processes[i][1];
          this.processes[i][1] = shortestProcess[1] + shortestProcess[2];
        } else {
          break;
        }
      }
      //* Insert what is left of the previous first process (if any) in the list before the process that didn't arrive during the current round.
      if (processName)
        this.processes.splice(i, 0, [
          processName,
          arrivalTime + this.quantum,
          burstTime - this.quantum
        ]);

      scheduler.push(shortestProcess);
    }

    this.chart = generateChart(scheduler, this.chartDiv);
    return totalWaiting;
  }

  render() {
    this.chart.render();
  }
}

userInterface(Chart);
