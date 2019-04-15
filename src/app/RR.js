import generateChart from "../helpers/generateChart";
import userInterface from "../views/userInterface3";
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
      avgWaiting = 0;

    this.processes.sort((a, b) => {
      //* Sort by arrival time then process name
      if (a[1] != b[1]) return a[1] - b[1];
      return a[0] - b[0];
    });

    //* Loop until you extract all the processes
    while (this.processes.length) {
      for (let i = 0; i < this.processes.length; i++) {
        //* If the current process comes later after the last process in the scheduler, break out of the loop and start from the beginning of the list
        if (i != 0) {
          if (
            this.processes[i][1] >
            scheduler[scheduler.length - 1][1] +
              scheduler[scheduler.length - 1][2]
          )
            break;
        }

        //* Extract the first process from the list on a unit-quantum-time basis and add it to the final scheduler list that is to be drawn on the chart
        let shortestProcess;

        //* If the burst time of the process <= quantum, extract it right away
        if (this.processes[i][2] <= this.quantum) {
          shortestProcess = this.processes.splice(i, 1)[0]; //! splice() returns the element wrapped in a list
          i--;
        }

        //* else consume "quantuam" second of the process, add it in the scheduler and leave the rest of the process in the list
        else {
          let [processName, arrivalTime, burstTime] = [...this.processes[i]];
          shortestProcess = [processName, arrivalTime, this.quantum];
          this.processes[i] = [
            processName,
            arrivalTime + this.quantum,
            burstTime - this.quantum
          ];
        }
        scheduler.push(shortestProcess);

        //* Add the execution time of the first process to all the other processes
        this.processes.forEach(process => {
          if (shortestProcess[1] + shortestProcess[2] > process[1]) {
            avgWaiting += shortestProcess[1] + shortestProcess[2] - process[1];
            process[1] = shortestProcess[1] + shortestProcess[2];
          }
        });
      }
    }

    this.chart = generateChart(scheduler, this.chartDiv);
    return avgWaiting;
  }

  render() {
    this.chart.render();
  }
}

userInterface(Chart);
