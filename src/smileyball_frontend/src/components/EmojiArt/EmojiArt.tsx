import { RenderEmoji } from "@/components/Emoji";
import styles from "./emojiArt.module.css";
import { TEXTURE_TYPES } from "@/data/textures";
import { LIB_TYPES } from "@/data/libs";
import { useTextGrid } from "@/hooks/useTextGrid";
import { Options } from "@/types/Grid";
import { TextureStyleObjDto } from "@/models/dto/textureStyleObj-dto";

export const EmojiArt = ({
  char,
  initValues,
}: {
  char: string;
  initValues?: {
    options?: Partial<Options>;
    initialVal?: Partial<TextureStyleObjDto>;
  };
}) => {
  const smileyBallTemplate = TEXTURE_TYPES.SMILEY_BALL;
  const PIXELMOJIS = LIB_TYPES.PIXELMOJIS;

  const [{ lib, letterOptions, palette }] = useTextGrid(
    smileyBallTemplate,
    PIXELMOJIS,
    initValues,
  );

  if(!lib){
    return <></>
  }


  return (
    <section className={styles.emojiArtWrapper}>
      <div className={styles.emojiArt}>
        {!!lib && Object.values(lib).length > 0
          ? lib[char].data?.map((el, index) => {
              return (
                <div key={`row-${index}`} className={styles.emojiArtBoxRow}>
                  {el?.map((el2) => {
                    return el2?.map((el3, renderEmojiIndex) => {
                      if (!el3) {
                        return (
                          <span
                            key={`renderEmoji-${renderEmojiIndex}`}
                            style={{
                              display: "flex",
                              position: "relative",
                              height: "16px",
                              width: "16px",
                            }}
                          />
                        );
                      }
                      return (
                        <RenderEmoji
                          key={`renderEmoji-${renderEmojiIndex}`}
                          id={el3}
                          options={letterOptions}
                        />
                      );
                    });
                  })}
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
};
