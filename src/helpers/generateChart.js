import ApexCharts from "apexcharts";

function generateChart(scheduler, chartDiv) {
  //* Format the chart data
  let data = [];
  scheduler.forEach(process => {
    for (let i = process[1]; i < process[1] + process[2]; i++)
      data.push({
        x: i.toString(),
        y: process[0]
      });
  });

  //* Specify chart options
  const options = {
    chart: {
      toolbar: {
        show: false
      },
      height: 200,
      type: "heatmap"
    },
    dataLabels: {
      enabled: true
    },
    colors: ["#263238"],
    series: [
      {
        name: "Process Name",
        data
      }
    ]
  };

  //* Return new chart instance
  return new ApexCharts(chartDiv, options);
}
export default generateChart;
