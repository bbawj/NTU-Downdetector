import { Chart as ChartJS, Filler } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(Filler);

export default function Hero() {
  let delayed;
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  const data = [1, 2, 4, 3, 4, 5, 3, 4, 5, 5, 7, 4, 8];
  const data1 = data.map((e) => e / 1.5);
  const data2 = data.map((e) => e / 2);
  const labels = [...data];

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "d",
          data: data,
          fill: true,
          backgroundColor: "#c72424",
          order: 3,
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.3,
        },
        {
          label: "d1",
          data: data1,
          fill: true,
          backgroundColor: "#e14e46",
          order: 2,
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.3,
        },
        {
          label: "d2",
          data: data2,
          fill: true,
          backgroundColor: "#fa7268",
          order: 1,
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.3,
        },
      ],
    };

    setChartData(chartData);
  }, []);

  return (
    <div className="container-fluid p-0">
      <Line
        redraw
        ref={chartRef}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (
                context.type === "data" &&
                context.mode === "default" &&
                !delayed
              ) {
                delay =
                  context.dataIndex ** 0.5 * 300 +
                  context.datasetIndex ** 0.2 * 100;
              }
              return delay;
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              display: false,
              beginAtZero: true,
            },
            x: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
