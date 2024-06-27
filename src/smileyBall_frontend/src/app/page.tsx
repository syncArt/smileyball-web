"use client";
import styles from "./page.module.css";

import Image from "next/image";
import { RenderEmoji } from "@/components/Emoji";
import { SmileyBallConfigurable } from "@/modules/SmileyBallConfigurable";
import { NftsShowroom } from "@/modules/NftsShowroom";
import { useAuth } from "@/hooks/useAuthClient";
import { LoggedIn, LoggedOut } from "@/components/buttons";
import { ProfileModal } from "@/components/ProfileModal";

export default function Home() {
  const { isAuthenticated } = useAuth();

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
        <div className={styles.bottomBar}>
          <div className={styles.bottomElement}>
            {false ? <ProfileModal /> : <LoggedOut />}
          </div>
          <div className={styles.navigation}>
            <a className={styles.navigationElement} href="https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=e45g2-taaaa-aaaan-qmn5q-cai">
              <RenderEmoji id="💎" options={{ size: "45px" }} />
            </a>
            <a className={styles.navigationElement} href="/SmileyBall.pdf">
              <RenderEmoji id="pirate_flag" options={{ size: "45px" }} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
