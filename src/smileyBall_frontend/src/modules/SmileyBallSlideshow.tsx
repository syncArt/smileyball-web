// @ts-nocheck
"use client";

import { useTextGrid } from "@/hooks/useTextGrid";
import { useEffect, useRef } from "react";
import { RenderEmoji } from "@/components/Emoji";
import styles from "./modules.module.css";
import EmojiArt from "@/components/EmojiArt";
import {TEXTURE_TYPES} from "@/data/textures";
import {LIB_TYPES} from "@/data/libs";

export const SmileyBallSlideshow = ({ char }) => {
  const smileyBallTemplate = TEXTURE_TYPES.SMILEY_BALL;
  const PIXELMOJIS = LIB_TYPES.PIXELMOJIS;

  const [
    {
      lib: emojisLib,
      letterOptions: emojisLetterOptions,
      palette: emojiPalette,
    },
    { changeEmoji: changeEmojiSmileyBall },
  ] = useTextGrid(smileyBallTemplate, PIXELMOJIS);

  const intervalRef = useRef({ intervalRef: null, counter: 0 });

  useEffect(() => {
    const BackgroundEmojis = ["💎", "🦄", "♾️", "🔥"];
    const MainEmojis = ["🤑", "💦", "🍑", "😈"];

    // Clear any existing interval
    if (intervalRef.current?.intervalRef) {
      clearInterval(intervalRef.current?.intervalRef);
    }

    if (emojiPalette && Object.values(emojiPalette).length > 0) {
      intervalRef.current.intervalRef = setInterval(() => {
        changeEmojiSmileyBall(
          "background",
          BackgroundEmojis[intervalRef.current?.counter],
        );
        changeEmojiSmileyBall("main", MainEmojis[intervalRef.current?.counter]);
        intervalRef.current.counter++;
        if (intervalRef.current.counter >= BackgroundEmojis.length) {
          intervalRef.current.counter = 0;
        }
      }, 1000);
    }

    // Cleanup function to clear the interval on unmount
    return () => {
      if (intervalRef.current?.intervalRef) {
        clearInterval(intervalRef.current?.intervalRef);
      }
    };
  }, [emojiPalette, changeEmojiSmileyBall]);

  return (
    <section className={styles.contentWrapper}>
      <EmojiArt char={char} lib={emojisLib} charOptions={emojisLetterOptions} />
    </section>
  );
};
