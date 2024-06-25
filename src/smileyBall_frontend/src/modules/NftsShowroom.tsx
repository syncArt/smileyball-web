import styles from "./modules.module.css";
import { EmojiArt } from "../components/EmojiArt/EmojiArt";

export const NftsShowroom = () => {
  return (
    <div className={styles.nftShowroomWrapper}>
      <div className={styles.nftShowroomWrapperBlurWrapper}>
        <EmojiArt
          char={"1"}
          initValues={{
            initialVal: {
              main: "🌫️",
              background: "🙂",
            },
          }}
        />
        <div className={styles.nftShowroomWrapperBlurred}>
          <EmojiArt
            char={"1"}
            initValues={{
              initialVal: {
                main: "🌫️",
                background: "🙂",
              },
            }}
          />
        </div>
      </div>
      <div className={styles.nftShowroomWrapperBlurWrapper}>
        <EmojiArt
          char={"2"}
          initValues={{
            initialVal: {
              main: "🌫️",
              background: "😆",
            },
          }}
        />
        <div className={styles.nftShowroomWrapperBlurred}>
          <EmojiArt
            char={"2"}
            initValues={{
              initialVal: {
                main: "🌫️",
                background: "😆",
              },
            }}
          />
        </div>
      </div>
      <div className={styles.nftShowroomWrapperBlurWrapper}>
        <EmojiArt
          char={"3"}
          initValues={{
            initialVal: {
              main: "😈",
              background: "🌫️",
            },
          }}
        />
        <div className={styles.nftShowroomWrapperBlurred}>
          <EmojiArt
            char={"3"}
            initValues={{
              initialVal: {
                main: "😈",
                background: "🌫️",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
