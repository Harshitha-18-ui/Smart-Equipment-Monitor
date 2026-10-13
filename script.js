
const temperatureElement = document.getElementById("temperature");
const statusElement = document.getElementById("status");
const alertElement = document.getElementById("alert");

const history = [28, 29, 30, 31, 32.5];
const labels = ["1", "2", "3", "4", "5"];

const chart = new Chart(
  document.getElementById("temperatureChart"),
  {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Temperature (°C)",
        data: history,
        borderColor: "#087e8b",
        backgroundColor: "#087e8b22",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  }
);

function simulateReading() {
  // Demo data only; not a real sensor reading.
  const temperature = Number((25 + Math.random() * 35).toFixed(1));

  temperatureElement.textContent = temperature + " °C";

  if (temperature >= 50) {
    statusElement.textContent = "Critical";
    statusElement.style.color = "#dc2626";
    alertElement.textContent =
      "CRITICAL: Temperature limit exceeded!";
    alertElement.style.color = "#dc2626";
  } else if (temperature >= 40) {
    statusElement.textContent = "Warning";
    statusElement.style.color = "#d97706";
    alertElement.textContent =
      "WARNING: Temperature is rising.";
    alertElement.style.color = "#d97706";
  } else {
    statusElement.textContent = "Normal";
    statusElement.style.color = "#087e8b";
    alertElement.textContent =
      "System operating normally.";
    alertElement.style.color = "#15803d";
  }

  chart.data.labels.push(String(chart.data.labels.length + 1));
  chart.data.datasets[0].data.push(temperature);

  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();
}
