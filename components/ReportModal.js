import React, { useRef, useState } from "react";
import { defaultFetcher, useOutsideAlerter } from "../lib/utils";
import Modal from "./Modal";
import { MdClose, MdSignalWifiConnectedNoInternet1 } from "react-icons/md";
import { ImPrinter } from "react-icons/im";
import styles from "../styles/ReportModal.module.css";

export default function ReportModal({ hall_id, setIsOpen }) {
  const modalRef = useRef(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  useOutsideAlerter(modalRef, setIsOpen);
  const handleReport = async () => {
    try {
      await defaultFetcher(`reports/${hall_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        }),
      });
      setReportSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal>
      <div className="card" ref={modalRef}>
        <div className="card-body position-relative">
          <MdClose className={styles.close} onClick={() => setIsOpen(false)} />
          {reportSuccess ? (
            <h4 className="card-title text-center p-3">
              Your report has been successfully logged!
            </h4>
          ) : (
            <div>
              <h4 className="card-title text-center">What&apos;s down?</h4>
              <div className="row">
                <div
                  className={styles.clickable + " col"}
                  onClick={handleReport}
                >
                  <MdSignalWifiConnectedNoInternet1 size="2em" />
                  <p className="m-0">Internet</p>
                </div>
                <div className="vr p-0"></div>
                <div className={styles.clickable + " col"}>
                  <ImPrinter size="2em" />
                  <p className="p-0">Printer</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
