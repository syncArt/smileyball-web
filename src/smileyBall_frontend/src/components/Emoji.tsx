"use client";

import emojiMartData from "@emoji-mart/data";
import { init as emojiMartInit } from "emoji-mart";

emojiMartInit({ data: emojiMartData }).then((e) => console.log(e)); // 🍸

export function RenderEmoji({ id, options, className }) {
  // @ts-expect-error Emoji mart somehow handles this component itself and typescript doesn't know about it so it's not too happy.
  return (
    !!id && (
      <div
        className={className}
        style={{
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <em-emoji
          id={id}
          skin={options?.skin || "1"}
          size={options?.size || "11px"}
          set={options?.set || "twitter"}
        />
      </div>
    )
  );
}
