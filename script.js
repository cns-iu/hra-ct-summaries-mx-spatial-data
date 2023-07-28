// Function to fetch and parse CSV data
async function fetchData(filePath) {
    const response = await fetch(filePath);
    const csvData = await response.text();
    return Papa.parse(csvData, { header: true, dynamicTyping: true }).data;
  }
  
  // Function to get the list of CSV files in the directory
  async function getCSVFilesInDirectory(directoryPath) {
    const apiUrl = `https://api.github.com/repos/cns-iu/hra-ct-summaries-mx-spatial-data/contents/${directoryPath}`;
    const response = await fetch(apiUrl);
    const files = await response.json();
    const csvFiles = files.filter(file => file.type === 'file' && file.name.endsWith('.csv'));
    return csvFiles.map(file => file.download_url);
  }
  
  // Function to merge data from multiple CSV files
  async function mergeDataFromCSVFiles(csvFilePaths) {
    const allData = [];
    for (const filePath of csvFilePaths) {
      const data = await fetchData(filePath);
      allData.push(...data);
    }
    return allData;
  }
  
  // Function to create a plot using Plotly.js
  function createPlot(data) {
    const xData = data.map(row => row.cell_type); // Replace 'x' with the column name containing x-axis data
    const yData = data.map(row => row.count); // Replace 'y' with the column name containing y-axis data
  
    const plotData = [
      {
        x: xData,
        y: yData,
        type: 'scatter', // Change the plot type as needed (scatter, bar, etc.)
        mode: 'lines+markers', // Customize the plot mode as needed
        name: 'Data Plot',
      },
    ];
  
    const layout = {
      title: 'Combined CSV Data Plot', // Customize the plot title
      xaxis: {
        title: 'X Axis', // Customize the x-axis label
      },
      yaxis: {
        title: 'Y Axis', // Customize the y-axis label
      },
    };
  
    Plotly.newPlot('plotly-chart', plotData, layout);
  }
  
  // Main function to load and plot data from all CSV files in the directory
  async function main() {
    try {
      const directoryPath = 'intestine_omap_2_0001/cell_type_counts'; // Replace 'data' with the name of the directory containing CSV files
      const csvFilePaths = await getCSVFilesInDirectory(directoryPath);
      const mergedData = await mergeDataFromCSVFiles(csvFilePaths);
      createPlot(mergedData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the main function when the page is loaded
  document.addEventListener('DOMContentLoaded', main);
  