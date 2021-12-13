import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { FaSearch } from "react-icons/fa";
import { useHalls, useReports } from "../lib/swr-hooks";
import Card from "../components/Card";
import Hero from "../components/Hero";

export async function getStaticProps() {
  let res = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/get-halls"
      : process.env.productionURL
  );
  let hallData;
  if (!res.ok) {
    hallData = { error: true };
  } else hallData = await res.json();

  res = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/get-reports"
      : process.env.productionURL
  );
  let reportData;
  if (!res.ok) {
    reportData = { error: true };
  } else reportData = await res.json();

  return {
    props: {
      halls: hallData,
      reports: reportData,
    },
    revalidate: 60, //seconds
  };
}

export default function Home(props) {
  const [time_list, setTimeList] = useState([]);
  const { halls, isHallLoading, isHallError } = useHalls(props.halls);
  const { reports, isReportLoading, isReportError } = useReports(props.reports);

  useEffect(() => {
    let temp = [];
    // create the 96 15min intervals in 1 day
    const start_time = Date.now();
    for (let i = 95; i >= 0; i--) {
      const timestamp = new Date(start_time - i * 15 * 60000);
      temp.push(timestamp.valueOf());
    }
    setTimeList(temp);
  }, []);
  return (
    <>
      <Head>
        <title>NTU Downdetector</title>
        <meta
          name="keywords"
          content="Nanyang Technological University, NTU, downdetector"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.header_text}>
            NTU <span>Down</span>detector
          </h1>
          <h4>realtime user reports of NTU services</h4>
          <div className={styles.searchbox}>
            <input type="text" placeholder="Where are you?" />
            <div className={styles.button}>
              <FaSearch />
            </div>
          </div>
        </div>
        <Hero />
        {isHallLoading || isReportLoading ? (
          <div className="container mx-auto">Loading...</div>
        ) : (
          <div className={styles.grid}>
            {!isHallError &&
              !isReportError &&
              halls.map((e) => (
                <Card
                  hall_name={e.name}
                  key={e.id}
                  times={time_list}
                  data={reports.filter((r) => r.hall_id == e.id)}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
