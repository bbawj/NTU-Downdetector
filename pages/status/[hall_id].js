import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  useIndividualHall,
  useIndividualReports,
  useInfiniteComments,
  useUser,
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
import Image from "next/image";
import AuthModal from "../../components/AuthModal";

function HallStatusPage() {
  const router = useRouter();
  const { hall_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const params = { mounted: mounted, hall_id: hall_id };
  const { reports } = useIndividualReports(params);
  const { hall } = useIndividualHall(params);
  const {
    commentData,
    size,
    setSize,
    isCommentLoading,
    isCommentError,
    isCommentEnd,
    isNoComments,
    commentMutate,
  } = useInfiniteComments(params);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const comments = commentData ? [].concat(...commentData) : [];
  const [openModal, setOpenModal] = useState(false);
  const [user, { mutate }] = useUser();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newComment = {
        user_id: 1,
        hall_id: hall_id,
        text: comment,
        posted_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const res = await defaultFetcher("comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      commentMutate([...commentData, { ...newComment, id: res.insertId }]);
      setComment("");
      //todo: add checks to ensure user is authenticated
    } catch (error) {
      //todo: add error handling for failed post request
      console.error(error.message);
      alert("Failed to post your comment. Please try again.");
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const logout = async () => {
    await defaultFetcher("user/logout");
    mutate(null);
  };

  const handleReport = async () => {
    try {
      await defaultFetcher(`reports/${hall_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        }),
      });
    } catch (error) {
      console.error(error);
    }
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
        const cur = Date.parse(reports[i].timestamp) + 8 * 60 * 60 * 1000;
        for (let j = 0; j < times.length - 1; j++) {
          if (cur >= times[j] && cur <= times[j + 1]) {
            grouped_data[j] += 1;
          }
        }
      }
    }
    setData(grouped_data);
  }, [reports]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container mt-3">
      <div className={styles.header + " card row"}>
        <Image
          className={styles.logo}
          src={hall ? `/${hall[0].name}.png` : "data:,"}
          width={240}
          height={240}
          layout="fixed"
        />
        <h1 className="text-center">{hall && hall[0].name}</h1>
        <button
          className="btn btn-primary col-lg-4 col-sm-6 mx-auto my-3 shadow-sm"
          onClick={handleReport}
        >
          I have a problem
        </button>
      </div>
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
        <div className="row justify-content-start">
          <h5 className="col-auto">Community comments</h5>
          <div className="col">
            {user ? (
              <span>
                Logged in as {user.email.split("@")[0]}.{" "}
                <span onClick={logout} className={styles.openModal}>
                  Logout?
                </span>
              </span>
            ) : (
              <span>
                <span
                  className={styles.openModal}
                  onClick={() => setOpenModal(true)}
                >
                  Login
                </span>{" "}
                to join the discussion.
              </span>
            )}
          </div>
          {openModal && (
            <AuthModal mutate={mutate} setOpenModal={setOpenModal} />
          )}
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
              <button
                className="btn btn-primary ms-3 text-white"
                disabled={!comment}
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
        {isNoComments && <div className="row">No comments found</div>}
        {!isCommentError &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              user={comment.email}
              text={comment.text}
              time={comment.posted_at}
            />
          ))}
        <button
          type="submit"
          disabled={isCommentLoading || isCommentEnd}
          onClick={() => setSize(size + 1)}
        >
          {isCommentLoading
            ? "Loading..."
            : isCommentEnd
            ? "No more comments"
            : "Load more"}
        </button>
      </div>
    </div>
  );
}

export default HallStatusPage;
