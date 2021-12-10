import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { FaSearch } from "react-icons/fa";
import { useHalls, useReports } from "../lib/swr-hooks";
import Card from "../components/Card";
import Hero from "../components/Hero";

export default function Home() {
  const { halls, isHallLoading } = useHalls();
  const { reports, isLoading, isError } = useReports();
  const [time_list, setTimeList] = useState([]);

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
          <h3>Realtime user reports of NTU services</h3>
          <div className={styles.searchbox}>
            <input type="text" placeholder="Where are you?" />
            <div className={styles.button}>
              <FaSearch />
            </div>
          </div>
        </div>
        <Hero />
        <div className={styles.grid}>
          {!isHallLoading &&
            !isLoading &&
            !isError &&
            halls.map((e) => (
              <Card
                hall_name={e.name}
                key={e.id}
                times={time_list}
                data={reports.filter((r) => r.hall_id == e.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
