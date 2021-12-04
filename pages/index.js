import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { FaSearch } from "react-icons/fa";
import { useHalls } from "../lib/swr-hooks";
import Card from "../components/Card";

export default function Home() {
  const { halls, isLoading, isError } = useHalls();
  console.log(halls);
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
        <div className={styles.grid}>
          {!isLoading &&
            !isError &&
            halls.map((e) => <Card name={e.name} key={e.id} />)}
        </div>
      </div>
    </>
  );
}
