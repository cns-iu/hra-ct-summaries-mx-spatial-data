// Define the path to your CSV files within the repository
const csvFilePaths = [
    'intestine_omap_2_0001/cell_type_counts/HBM235.VKNJ.237.csv',
    'intestine_omap_2_0001/cell_type_counts/HBM238.GTNW.259.csv',
    // Add more file paths as needed
  ];
  
  // Function to fetch and parse CSV data
  async function fetchData(filePath) {
    const response = await fetch(filePath);
    const csvData = await response.text();
    return Papa.parse(csvData, { header: true, dynamicTyping: true }).data;
  }
  
  // Function to create a plot using Plotly.js
  function createPlot(data) {
    const xData = data.map(row => row.cell_type); // Replace 'x' with the column name containing x-axis data
    const yData = data.map(row => row.count); // Replace 'y' with the column name containing y-axis data
  
    const plotData = [
      {
        labels: xData,
        values: yData,
        type: 'pie', // Change the plot type as needed (scatter, bar, etc.)
        //mode: '', // Customize the plot mode as needed
        name: 'Data Plot',
      },
    ];
  
    // const layout = {
    //   title: 'CSV Data Plot', // Customize the plot title
    //   xaxis: {
    //     title: 'X Axis', // Customize the x-axis label
    //   },
    //   yaxis: {
    //     title: 'Y Axis', // Customize the y-axis label
    //   },
    // };
    var layout = {
        height: 4000,
        width: 5000
      };
  
    Plotly.newPlot('plotly-chart', plotData, layout);
  }
  
  // Main function to load and plot data from multiple CSV files
  async function main() {
    for (const filePath of csvFilePaths) {
      const data = await fetchData(filePath);
      createPlot(data);
    }
  }
  
  // Call the main function when the page is loaded
  document.addEventListener('DOMContentLoaded', main);
  