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
    //* Sort by arrival time
    this.processes.sort(function(a, b) {
      return a[1] - b[1];
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

    //* Format the chart data
    let data = [];
    this.processes.forEach(process => {
      for (let i = process[1]; i < process[1] + process[2]; i++)
        data.push({
          x: i.toString(),
          y: process[0]
        });
    });

    this.chart = generateChart(data, this.chartDiv);
    return avgWaiting;
  }

  render() {
    this.chart.render();
  }
}

userInterface(Chart);
