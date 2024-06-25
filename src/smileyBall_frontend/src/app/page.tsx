"use client";
import styles from "./page.module.css";

import Image from "next/image";
import { RenderEmoji } from "@/components/Emoji";
import { SmileyBallConfigurable } from "@/modules/SmileyBallConfigurable";
import { NftsShowroom } from "@/modules/NftsShowroom";
import { useAuth } from "@/hooks/useAuthClient";
import LoggedIn from "@/components/LoggedIn";
import LoggedOut from "@/components/LoggedOut";

export default function Home() {
  const { isAuthenticated, identity } = useAuth();

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.topBar}>
          <div className={styles.topBarSmiley}>
            <Image alt="logo" src="/logo.svg" width="200" height="50" />
            <span className={styles.smilingEmoji}>
              <RenderEmoji id="🙂" options={{ size: "33px" }} />
            </span>
          </div>
        </div>
        <div className={styles.pixelmojisBg}>
          <div className={styles.pixelmojisBgContent}>
            <SmileyBallConfigurable />
          </div>
          <Image
            alt="logo"
            src="/pixelmojisBgText.svg"
            width={1551}
            height={260}
          />
        </div>
        {/*<NftsShowroom />*/}
        {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
        <div className={styles.bottomBar}>
          <div className={styles.bottomElement}>
            <a href="https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=e45g2-taaaa-aaaan-qmn5q-cai">
              <Image alt="coin" src="/coin.svg" width="150" height="50" />
            </a>
          </div>
          <div className={styles.bottomElement}>
            <a href="/SmileyBall.pdf">
              <Image alt="watwat" src="/watwat.svg" width="150" height="50" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
