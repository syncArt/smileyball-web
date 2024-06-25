// @ts-nocheck
import styles from "./modules.module.css";
import { useTextGrid } from "@/hooks/useTextGrid";
import { TEXTURE_TYPES } from "@/data/textures";
import { LIB_TYPES } from "@/data/libs";
import { RenderEmoji } from "@/components/Emoji";
import AnimatedBox from "@/components/AnimatedBox";
import Image from "next/image";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";
import classNames from "classnames";

export const SmileyBallConfigurable = () => {
  const [activePicker, setActivePicker] = useState("");

  const smileyBallTemplate = TEXTURE_TYPES.SMILEY_BALL;
  const PIXELMOJIS = LIB_TYPES.PIXELMOJIS;

  const [{ lib, letterOptions, palette }, { changeEmoji }] = useTextGrid(
    smileyBallTemplate,
    PIXELMOJIS,
  );

  const handlePickerOnSelect = (emoji) => {
    changeEmoji(activePicker, emoji.native);
  };

  const handleEmojiChangeAction = (name) => {
    if (activePicker !== name) {
      setActivePicker(name);
    } else {
      setActivePicker("");
    }
  };

  return (
    <AnimatedBox>
      <div className={styles.createYourOwnLeft}>
        <Image alt="logo" src="/createYourOwn.svg" fill />
      </div>
      <div className={styles.createYourOwnTop}>
        <Image alt="logo" src="/createYourOwn.svg" fill />
      </div>
      <div className={styles.createYourOwnRight}>
        <Image alt="logo" src="/createYourOwn.svg" fill />
      </div>
      <section className={styles.contentWrapper}>
        {!!lib && Object.values(lib).length > 0
          ? Object.values(lib)[0].data?.map((el, index) => {
              return (
                <div key={`row-${index}`} className={styles.smilingEmojiBoxRow}>
                  {el?.map((el2) => {
                    return el2?.map((el3, renderEmojiIndex) => {
                      return (
                        <RenderEmoji
                          key={`renderEmoji-${renderEmojiIndex}`}
                          id={el3}
                          className={classNames({
                            [styles.emojiArtPixelMain]:
                              palette.main == el3 && activePicker === "background",
                            [styles.emojiArtPixelBackground]:
                              palette.background == el3 &&
                              activePicker === "main",
                          })}
                          options={letterOptions}
                        />
                      );
                    });
                  })}
                </div>
              );
            })
          : null}
      </section>
      <div className={styles.configurePaletteWrapper}>
        <div className={styles.configurePalette}>
          <button
            className={styles.palettePicker}
            onClick={() => handleEmojiChangeAction("main")}
          >
            {activePicker == "main" && (
              <span className={styles.palettePickerActive}>{palette.main}</span>
            )}
            <RenderEmoji id={palette.main} options={{ size: "77px" }} />
          </button>
          <button
            className={styles.palettePicker}
            onClick={() => handleEmojiChangeAction("background")}
          >
            {activePicker == "background" && (
              <span className={styles.palettePickerActive}>
                {palette.background}
              </span>
            )}
            <RenderEmoji id={palette.background} options={{ size: "77px" }} />
          </button>
          <div className={styles.palettePickerPickerComponent}>
            {activePicker && (
              <Picker
                data={data}
                set="native"
                onEmojiSelect={handlePickerOnSelect}
              />
            )}
          </div>
        </div>
      </div>
    </AnimatedBox>
  );
};
