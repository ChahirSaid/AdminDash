import React, { useState, useEffect } from 'react';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);
import './Statistics.scss';



const Statistics = () => {
  const [myChart, setMyChart] = useState(null);
  const [jsonData, setJsonData] = useState([
    {"month": "January", "income": 1000},
    {"month": "February", "income": 1500},
    {"month": "March", "income": 1200},
    {"month": "April", "income": 1800},
    {"month": "May", "income": 2000},
    {"month": "June", "income": 1700}
  ]);

  useEffect(() => {
    createChart(jsonData, 'bar');
  }, []);

  const createChart = (data, type) => {
    if (myChart) {
      myChart.destroy();
    }
    const ctx = document.getElementById('myChart').getContext('2d');

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const newChart = new Chart(ctx, {
      type: type,
      data: {
        labels: data.map(row => row.month),
        datasets: [{
          label: '# of Income',
          data: data.map(row => row.income),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 2500
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    });
    setMyChart(newChart);
  };

  const setChartType = chartType => {
    createChart(jsonData, chartType);
  };

  return (
    <div className="chart">
      <div className="chart_types">
        <button onClick={() => setChartType('bar')}>Bars</button>
        <button onClick={() => setChartType('line')}>Line</button>
        <button onClick={() => setChartType('doughnut')}>Doughnut</button>
        <button onClick={() => setChartType('polarArea')}>PolarArea</button>
        <button onClick={() => setChartType('radar')}>Radar</button>
      </div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Statistics;
