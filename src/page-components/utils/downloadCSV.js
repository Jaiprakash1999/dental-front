export const downloadCSV = (data, fileName = "data.csv") => {
  if (!data || data.length === 0) {
    console.error("No data available for download");
    return;
  }

  // Convert JSON data to CSV format
  const csvHeaders = Object.keys(data[0]).join(",") + "\n"; // CSV Headers
  const csvRows = data.map((row) => Object.values(row).join(",")).join("\n"); // CSV Rows
  const csvContent = csvHeaders + csvRows;

  // Create a Blob and generate a downloadable link
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
