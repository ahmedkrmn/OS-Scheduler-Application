import generateChart from "../helpers/generateChart";
import userInterface from "../views/userInterface1";
import clone from "clone";

class Chart {
  constructor(processes, chartDiv) {
    //! Deep clone the processes array
    this.processes = clone(processes);
    this.chartDiv = chartDiv;
  }
  generate() {
    this.processes.sort((a, b) => {
      //* Sort by arrival time then process name
      if (a[1] != b[1]) return a[1] - b[1];
      return a[0] - b[0];
    });

    let avgWaiting = 0;
    //* Update the start time of the execution of each process and calculate average waiting time
    for (let i = 0; i < this.processes.length; i++) {
      if (i == 0) continue;
      if (
        this.processes[i - 1][1] + this.processes[i - 1][2] >
        this.processes[i][1]
      ) {
        avgWaiting +=
          this.processes[i - 1][1] +
          this.processes[i - 1][2] -
          this.processes[i][1];
        this.processes[i][1] =
          this.processes[i - 1][1] + this.processes[i - 1][2];
      }
    }

    this.chart = generateChart(this.processes, this.chartDiv);
    return avgWaiting;
  }

  render() {
    this.chart.render();
  }
}

userInterface(Chart);
