import ApexCharts from "apexcharts";

function generateChart(data, chartDiv) {
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
    colors: ["#663F59"],
    series: [
      {
        name: "Process Name",
        data
      }
    ]
  };
  return new ApexCharts(chartDiv, options);
}
export default generateChart;
