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
    let scheduler = [],
      avgWaiting = 0;

    //* Loop until you extract all the processes
    while (this.processes.length) {
      this.processes.sort((a, b) => {
        //* Sort by arrival time then burst time
        if (a[1] != b[1]) return a[1] - b[1];
        else return a[2] - b[2];
      });

      //* Extract the shortest process from the list and add it to the final scheduler list that is to be drawn on the chart
      const shortestProcess = this.processes.shift();
      scheduler.push(shortestProcess);

      //* Add the execution time of the shortest process to all the other processes
      this.processes.forEach(process => {
        if (shortestProcess[1] + shortestProcess[2] > process[1]) {
          avgWaiting += shortestProcess[1] + shortestProcess[2] - process[1];
          process[1] = shortestProcess[1] + shortestProcess[2];
        }
      });
    }

    //* Format the chart data
    let data = [];
    scheduler.forEach(process => {
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
