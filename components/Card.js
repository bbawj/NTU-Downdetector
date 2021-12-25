import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export default function Card({ hall_name, times, data }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let grouped_data = new Array(95).fill(0);
    for (let i = 0; i < data.length; i++) {
      const cur = Date.parse(data[i].timestamp);
      for (let j = 0; j < times.length - 1; j++) {
        if (cur >= times[j] && cur <= times[j + 1]) {
          grouped_data[j] += 1;
        }
      }
    }
    setChartData(grouped_data);
  }, []);

  return (
    <Link href={`/status/${hall_name}`}>
      <div className="card btn shadow-sm">
        <div className="card-body p-0">
          <Image
            src={`/${hall_name}.png`}
            width={120}
            height={120}
            alt={hall_name}
          />
          <h5 className="card-title text-center">{hall_name}</h5>
          <div className="container align-bottom py-2 h-25">
            <Line
              data={{
                labels: times.slice(0, times.length - 1),
                datasets: [
                  {
                    label: "Test",
                    data: chartData,
                    borderColor: "#000000",
                    borderWidth: 1,
                    pointRadius: 0,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
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
        </div>
      </div>
    </Link>
  );
}
