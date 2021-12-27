import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useIndividualReports } from "../../lib/swr-hooks";
import {
  CategoryScale,
  TimeSeriesScale,
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
  TimeSeriesScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
import styles from "../../styles/Hall.module.css";

function HallStatusPage() {
  const router = useRouter();
  const { hallName } = router.query;
  const { reports } = useIndividualReports(hallName);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("posted");
  };

  useEffect(() => {
    let times = [];
    let labels = [];
    // create the 96 15min intervals in 1 day
    const start_time = Date.now();
    for (let i = 96; i >= 0; i--) {
      const timestamp = new Date(start_time - i * 15 * 60000);
      times.push(timestamp.valueOf());
      labels.push(timestamp.toLocaleTimeString());
    }
    setLabels(labels);
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
  }, [reports]);

  return (
    <div className="container mt-3">
      <h1 className="text-center">{hallName}</h1>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Reports",
              data: data,
              borderColor: "#fa5145",
              borderWidth: 2,
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
              grid: {
                display: false,
              },
              ticks: {
                callback: (val, index) => {
                  return index % 12 === 0 ? labels[val] : "";
                },
              },
            },
            y: {
              beginAtZero: true,
              grace: 5,
            },
          },
        }}
      />
      <div className="container mt-5 p-4 card">
        <div className="row">
          <h3>Community comments</h3>
        </div>
        <div className="row">
          <form className={styles.commentBox} onSubmit={handleSubmit}>
            <div className={styles.labelBox}>
              <textarea id="comment" name="text" required autoComplete="off" />
              <label htmlFor="comment" className={styles.commentLabel}>
                <span className={styles.commentContent}>
                  Experiencing issues?
                </span>
              </label>
            </div>
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HallStatusPage;