import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Head>
        <title>NTU Downdetector</title>
        <meta
          name="keywords"
          content="Nanyang Technological University, NTU, downdetector"
        />
      </Head>
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
    </>
  );
}
