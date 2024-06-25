"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuthClient";
import styles from "./buttons.module.css";
import Image from "next/image";

const LoggedIn = () => {
  const [result, setResult] = React.useState("");

  const { whoamiActor, logout } = useAuth();

  useEffect(() => {
    const handleWhoami = async () => {
        if(whoamiActor){
            const whoami = await whoamiActor?.whoami();
            setResult(whoami);
        }

    };
    handleWhoami();
  }, []);

  return (
    <div className={styles.loggedInWrapper}>
        <div className={styles.loggedInText}>
            <p style={{marginRight: '4px'}}>Nice to have you! <input
                type="text"
                readOnly
                id="whoami"
                value={result}
                placeholder="your Identity"
            /></p>
            <p>We're still working on an app!</p>
            <p>Keep in touch ;)</p>
        </div>
      <button className={styles.loggedIn} id="logout" onClick={logout}>
          <Image alt="logout" src="/logout.svg" width="150" height="50" />
      </button>
    </div>
  );
};

export default LoggedIn;
