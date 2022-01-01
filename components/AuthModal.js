import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/AuthModal.module.css";
import ClientOnlyPortal from "./ClientOnlyPortal";
import TextInput from "./TextInput";

const schema = yup.object({
  email: yup
    .string()
    .matches(/(@e\.ntu.edu\.sg)$/, {
      excludeEmptyString: true,
      message: "Only NTU email is allowed",
    })
    .required("Email must not be empty"), //ntu domain exists at the endof string
  password: yup.string().required("Password cannot be empty"),
});

export default function AuthModal({ setOpenModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [activeTab, setActiveTab] = useState(0);

  const onSubmit = (data) => console.log(data);

  return (
    <ClientOnlyPortal selector="#modal">
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className="card">
          <div className="card-body px-5">
            <div className={styles.tabs}>
              <div
                onClick={() => setActiveTab(0)}
                className={activeTab === 0 ? styles.active : ""}
              >
                Login
              </div>
              <div
                onClick={() => setActiveTab(1)}
                className={"ml-4 " + (activeTab === 1 ? styles.active : "")}
              >
                Signup
              </div>
              <div
                className={
                  styles.indicator +
                  " " +
                  (activeTab === 0 ? null : styles.indicatorRight)
                }
              ></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput name="email" errors={errors} register={register} />
              <TextInput name="password" errors={errors} register={register} />
              <button className="shadow-sm" type="submit">
                Login
              </button>
            </form>
            <button onClick={() => setOpenModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
}
