import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  useComments,
  useIndividualHall,
  useIndividualReports,
} from "../../lib/swr-hooks";
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
import { defaultFetcher } from "../../lib/utils";
import Comment from "../../components/Comment";

function HallStatusPage() {
  const router = useRouter();
  const { hall_id } = router.query;
  const { reports } = useIndividualReports(hall_id);
  const { hall } = useIndividualHall(hall_id);
  const { comments, isCommentLoading, isCommentError } = useComments();
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState();
  const [comment, setComment] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await defaultFetcher("comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,
        hall_id: hall_id,
        text: comment,
        posted_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      }),
    });
    console.log(res);

    //todo: add checks to ensure user is authenticated
  };

  const handleChange = (e) => {
    setComment(e.target.value);
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
      <h1 className="text-center">{hall && hall[0].name}</h1>
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
          <h5>Community comments</h5>
        </div>
        <div className="row">
          <form className={styles.commentBox} onSubmit={handleSubmit}>
            <div className={styles.labelBox}>
              <textarea
                value={comment}
                onChange={handleChange}
                id="comment"
                name="text"
                required
                autoComplete="off"
              />
              <label htmlFor="comment" className={styles.commentLabel}>
                <span className={styles.commentContent}>
                  Experiencing issues?
                </span>
              </label>
            </div>
            <button type="submit">Post</button>
          </form>
        </div>
        {isCommentLoading ? (
          <div>Loading...</div>
        ) : (
          !isCommentError &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              user={comment.user_id}
              text={comment.text}
              time={comment.posted_at}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HallStatusPage;
