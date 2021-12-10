import { Chart as ChartJS, Filler } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "../styles/Hero.module.css";

ChartJS.register(Filler);

export default function Hero() {
  let delayed;
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  const data = [1, 2, 4, 3, 4, 5, 3, 4, 5, 5, 7, 4, 8];
  const labels = [...data];

  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(1, "rgba(250, 114, 104, 0.3)");
    gradient.addColorStop(0, "rgba(199, 36, 36, 1)");
    return gradient;
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          fill: true,
          backgroundColor: createGradient(chart.ctx, chart.chartArea),
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.3,
        },
      ],
    };

    setChartData(chartData);
  }, []);

  return (
    <div className={styles.herobox}>
      <Line
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
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
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
