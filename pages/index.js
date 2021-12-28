import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { FaSearch } from "react-icons/fa";
import { useHalls, useReports } from "../lib/swr-hooks";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { defaultFetcher } from "../lib/utils";

export async function getStaticProps() {
  const hallData = await defaultFetcher("halls");
  const reportData = await defaultFetcher("reports");

  return {
    props: {
      halls: hallData,
      reports: reportData,
    },
    revalidate: 60, //seconds
  };
}

export default function Home(props) {
  const searchBarRef = useRef();
  const [time_list, setTimeList] = useState([]);
  const { halls, isHallLoading, isHallError } = useHalls(props.halls);
  const { reports, isReportLoading, isReportError } = useReports(props.reports);
  const [filteredHalls, setFilteredHalls] = useState([]);

  function handleSearch() {
    setFilteredHalls(
      halls.filter((hall) => {
        return hall.name
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(
            searchBarRef.current.value.toLowerCase().replace(/\s/g, "")
          );
      })
    );
    searchBarRef.current.value = "";
  }

  useEffect(() => {
    let temp = [];
    // create the 96 15min intervals in 1 day
    const start_time = Date.now();
    for (let i = 96; i >= 0; i--) {
      const timestamp = new Date(start_time - i * 15 * 60000);
      temp.push(timestamp.valueOf());
    }
    setTimeList(temp);
    setFilteredHalls(halls);
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSearch();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
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
            <input
              ref={searchBarRef}
              type="text"
              placeholder="Where are you?"
            />
            <div className={styles.button} onClick={handleSearch}>
              <FaSearch />
            </div>
          </div>
        </div>
        <Hero />
        {isHallError || isReportError ? (
          <h5 className="text-center mt-5">An error occured</h5>
        ) : isHallLoading || isReportLoading ? (
          <h5 className="text-center mt-5">Loading...</h5>
        ) : (
          <div className={styles.grid}>
            {filteredHalls &&
              filteredHalls.length != 0 &&
              filteredHalls.map((e) => (
                <Card
                  hall_id={e.id}
                  hall_name={e.name}
                  key={e.id}
                  times={time_list}
                  data={reports.filter((r) => r.hall_id === e.id)}
                />
              ))}
          </div>
        )}
        {filteredHalls && filteredHalls.length === 0 && (
          <h3 className="text-center">No results found</h3>
        )}
      </div>
    </>
  );
}
