"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuthClient";
import Image from "next/image";
import styles from "./buttons.module.css";

const LoggedOut = () => {
  const { login } = useAuth();

  return (
    <button
      className={styles.loggedOut}
      type="button"
      id="loginButton"
      onClick={login}
    >
      LOGIN
    </button>
  );
};

export default LoggedOut;
