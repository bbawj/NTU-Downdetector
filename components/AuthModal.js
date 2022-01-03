import React, { useState } from "react";
import styles from "../styles/AuthModal.module.css";
import ClientOnlyPortal from "./ClientOnlyPortal";
import ModalForm from "./ModalForm";
import TextInput from "./TextInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultFetcher } from "../lib/utils";

const loginSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Password cannot be empty"),
});

const signupSchema = yup.object({
  email: yup
    .string()
    .matches(/(@e\.ntu.edu\.sg)$/, {
      excludeEmptyString: true,
      message: "Only NTU email is allowed",
    })
    .required("Email must not be empty"), //ntu domain exists at the endof string
  password: yup.string().required("Password cannot be empty."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

export default function AuthModal({ mutate, setOpenModal }) {
  const [activeTab, setActiveTab] = useState(0);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    setError: setSignupError,
    formState: { errors: signupErrors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = async (data) => {
    const res = await defaultFetcher("user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.error) {
      setError("password", {
        type: "manual",
        message: "Invalid email and password combination.",
      });
    } else {
      mutate(res);
      setOpenModal(false);
    }
  };

  const onSignupSubmit = async (data) => {
    const res = await defaultFetcher("user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.error) {
      setSignupError("passwordConfirmation", {
        type: "manual",
        message: "Failed to create your account. Please try again.",
      });
    } else {
      //todo: open success modal telling users to verify email
      //for now we simply close the modal
      setOpenModal(false);
    }
  };

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
            <div className={styles.tabBody}>
              <ModalForm
                index={0}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                activeTab={activeTab}
                setOpenModal={setOpenModal}
              >
                <TextInput
                  name="email"
                  type="text"
                  errors={errors}
                  register={register}
                  placeholder="Email"
                />
                <TextInput
                  name="password"
                  type="password"
                  errors={errors}
                  register={register}
                  placeholder="Password"
                />
              </ModalForm>
              <ModalForm
                index={1}
                handleSubmit={handleSignupSubmit}
                onSubmit={onSignupSubmit}
                activeTab={activeTab}
                setOpenModal={setOpenModal}
              >
                <TextInput
                  name="email"
                  type="text"
                  errors={signupErrors}
                  register={signupRegister}
                  placeholder="student@ntu.edu.sg"
                />
                <TextInput
                  name="password"
                  type="password"
                  errors={signupErrors}
                  register={signupRegister}
                  placeholder="Password"
                />
                <TextInput
                  name="passwordConfirmation"
                  type="password"
                  errors={signupErrors}
                  register={signupRegister}
                  placeholder="Confirm password"
                />
              </ModalForm>
            </div>
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
}
