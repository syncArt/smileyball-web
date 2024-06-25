"use client"

import React, {useEffect} from "react";
import { useAuth } from "@/hooks/useAuthClient";
import styles from "./buttons.module.css";

const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

const LoggedIn = () => {
  const [result, setResult] = React.useState("");

  const { whoamiActor, logout } = useAuth();

    useEffect(() => {
        const handleWhoami = async () => {
            const whoami = await whoamiActor.whoami();
            setResult(whoami);
        };
        handleWhoami();
    }, [])



  return (
    <div className="container">
      <input
        type="text"
        readOnly
        id="whoami"
        value={result}
        placeholder="your Identity"
        style={whoamiStyles}
      />
      <button id="logout" onClick={logout} className={styles.loggedIn}>
        log out
      </button>
    </div>
  );
}

export default LoggedIn;
