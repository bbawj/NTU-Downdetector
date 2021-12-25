import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useIndividualReports } from "../../lib/swr-hooks";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
function HallStatusPage() {
  const router = useRouter();
  const { hallId } = router.query;
  const { reports } = useIndividualReports(hallId);
  const [times, setTimes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    // create the 96 15min intervals in 1 day
    const start_time = Date.now();
    for (let i = 96; i >= 0; i--) {
      const timestamp = new Date(start_time - i * 15 * 60000);
      temp.push(timestamp.valueOf());
    }
    setTimes(temp);
    let grouped_data = new Array(96).fill(0);
    if (reports) {
      for (let i = 0; i < reports.length; i++) {
        const cur = Date.parse(reports[i].timestamp);
        for (let j = 0; j < times.length - 1; j++) {
          if (cur >= times[j] && cur <= times[j + 1]) {
            grouped_data[j] += 1;
          }
        }
      }
    }

    setData(grouped_data);
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center">{hallId}</h1>
      <Line
        data={{
          labels: times,
          datasets: [
            {
              label: "Test",
              data: data,
              borderColor: "#000000",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: false,
          },
          scales: {
            x: {
              ticks: {
                callback: (val, index) => {
                  return index % 12 === 0
                    ? new Date(times[val]).toLocaleTimeString()
                    : "";
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default HallStatusPage;
