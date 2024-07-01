"use client";

import styles from "./profileModal.module.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuthClient";
import Image from "next/image";
import classNames from "classnames";

export const ProfileModal = () => {
  const [result, setResult] = React.useState("");
  const [isFullHeight, setIsFullHeight] = useState(false);

  const { whoamiActor, logout } = useAuth();

  const handleCollapser = () => {
    setIsFullHeight((prev) => !prev);
  };

  useEffect(() => {
    const handleWhoami = async () => {
      if (whoamiActor) {
        const whoami = await whoamiActor?.whoami();
        setResult(whoami);
      }
    };
    handleWhoami();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.profileBox}>
          <div className={styles.profileBoxTop}>
            <div className={styles.avatar}>🙂</div>
            <div className={styles.profileInfo}>
              <div className={styles.profileId}>
                <input
                  type="text"
                  readOnly
                  id="whoami"
                  value={result}
                  placeholder="......"
                />
              </div>
              <div className={styles.profileProfs}>
                <p>🙂</p>
                <p>🙂</p>
                <p>🙂</p>
              </div>
            </div>
          </div>
          <div
            className={classNames(styles.navigation, {
              [styles.navigationFullSize]: isFullHeight,
            })}
          >
            <ul className={styles.navigationList}>
              <li className={styles.navigationListItem}>LEADERBOARD</li>
              <li className={styles.navigationListItem}>TALENT TREE</li>
              <li className={styles.navigationListItem}>Connect with X</li>
              <li className={styles.navigationListItem}>Connect with PLUG WALLET</li>
            </ul>
          </div>
          <div className={styles.profileBoxBottom}>
            <div className={styles.collapser}>
              <div
                className={classNames(styles.ballBalance, {
                  [styles.ballBalanceVisible]: isFullHeight,
                })}
              >
                0 $BALL
              </div>
              <Image
                className={styles.collapserArrow}
                alt="arrows"
                src="/arrows.svg"
                width="16"
                height="16"
                style={{
                  transform: isFullHeight ? "rotate(180deg)" : "rotate(0)",
                }}
                onClick={handleCollapser}
              />
            </div>
            <button className={styles.logoutButton} onClick={logout}>
              EXIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
