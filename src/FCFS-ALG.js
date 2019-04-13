import ApexCharts from "apexcharts";

class DrawChart {
  constructor(processes, chartDiv) {
    this.processes = processes;
    this.chartDiv = chartDiv;
  }
  generate() {
    this.processes.sort(function(a, b) {
      return a[1] - b[1];
    });
    let chartData = [
      {
        name: "Process Name",
        data: []
      }
    ];
    let categories = [];
    let x = 0;
    let avgWaiting = 0,
      totalTime = 0;
    this.processes.forEach(process => {
      if (process[1] > x) {
        while (process[1] - x) {
          // categories.push(x.toString());
          // chartData[0].data.push({ x: x.toString(), y: 0 });
          x++;
        }
      }
      avgWaiting += x - process[1];
      for (let i = 0; i < process[2]; i++) {
        categories.push(x);
        chartData[0].data.push({ x: x.toString(), y: process[0] });
        x++;
        totalTime++;
      }
    });
    // avgWaiting /= this.processes.length;

    const options = {
      chart: {
        height: 200,
        type: "heatmap"
      },
      dataLabels: {
        enabled: true
      },
      colors: ["#663F59"],
      series: chartData
    };

    this.chart = new ApexCharts(this.chartDiv, options);
    return [avgWaiting, totalTime];
  }
  render() {
    this.chart.render();
  }
}

export default DrawChart;
