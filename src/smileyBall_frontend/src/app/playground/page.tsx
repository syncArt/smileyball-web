"use client";

import styles from "./playground.module.css";
import { useRef, useState } from "react";
import { useLayoutManipulators } from "@/hooks/useLayoutManipulators";
import { useTextGrid } from "@/hooks/useTextGrid";
import { TEXTURE_TYPES } from "@/data/textures";
import { LIB_TYPES } from "@/data/libs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { init } from "emoji-mart";

init({ data });

export default function Playground() {
  const template = TEXTURE_TYPES.EMOJI_MART;
  const Ascii3x4LibType = LIB_TYPES.ASCII_3x4;

  const copyRef = useRef(null);
  const [autoTextLoaded, setAutoTextLoaded] = useState(false);

  const [
    { isColumn, isBorder, isSquare },
    { switchGrid, setBorder, setSquare },
  ] = useLayoutManipulators();

  const [activePicker, setActivePicker] = useState("");

  const textData = useTextGrid(template, Ascii3x4LibType);
  const [
    { textGrid, inputText, palette, letterOptions, lib },
    { changeEmoji, setText },
  ] = textData;

  const handleEmojiChangeAction = (name) => {
    if (name === "border") {
      setBorder(true);
    }
    if (activePicker !== name) {
      setActivePicker(name);
    } else {
      setActivePicker("");
    }
  };

  const handlePickerOnSelect = (emoji) => {
    changeEmoji(activePicker, emoji.native);
  };

  const handleText = (e) => {
    setText(e.currentTarget.value.toLowerCase());
  };

  const handleOnKeyDown = (e) => {
    const keyCode = e.key.toLowerCase().charCodeAt(0);
    const availableCodes = Object.keys(lib).map((letter) => {
      return letter.toLowerCase().charCodeAt(0);
    });
    if (![...availableCodes, 13, 8].includes(keyCode)) {
      e.preventDefault();
    }
  };

  const handleCopy = () => {
    // Define the regex patterns to match class names like "page_text3_*" and "page_text4_*"
    const pageText3Regex = /^page_text3__/;
    const pageText4Regex = /^page_text4__/;

    // Get all elements in the document
    const allElements = document.getElementsByTagName("*");

    // Array to hold elements with class "page_text3_*"
    const pageText3Elements = [];

    // Iterate through all elements to find "page_text3_*" elements
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const classList = element.classList;

      // Check if any class matches the "page_text3_*" regex
      for (let j = 0; j < classList.length; j++) {
        if (pageText3Regex.test(classList[j])) {
          pageText3Elements.push(element);
          break;
        }
      }
    }

    // String to hold the collected innerHTML content
    let clipboardText = "";

    // Iterate through each "page_text3_*" element
    pageText3Elements.forEach((pageText3Element) => {
      // Iterate through its child nodes
      const childNodes = pageText3Element.childNodes;

      childNodes.forEach((childNode) => {
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          const childClassList = childNode.classList;

          // Check if the child node has a class matching "page_text4_*"
          for (let k = 0; k < childClassList.length; k++) {
            if (pageText4Regex.test(childClassList[k])) {
              // Append the innerHTML to clipboardText
              clipboardText += !!childNode.innerHTML
                ? childNode.innerHTML.trim()
                : palette.background.trim();
              break;
            }
          }
        }
      });
      clipboardText += "\n";
    });

    // Copy the collected text to the clipboard
    navigator.clipboard
      .writeText(clipboardText)
      .then(() => {
        console.log("Text copied to clipboard successfully!");
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard: ", err);
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.navBar}>
        <textarea
          className={styles.navBarElement}
          onChange={handleText}
          onKeyDown={handleOnKeyDown}
          value={inputText}
        />
        <button
          className={styles.navBarElement}
          onClick={() => handleEmojiChangeAction("main")}
        >
          main: {palette.main}
        </button>
        <button
          className={styles.navBarElement}
          onClick={() => handleEmojiChangeAction("background")}
        >
          background: {palette.background}
        </button>
        <button
          className={styles.navBarElement}
          onClick={() => handleEmojiChangeAction("border")}
        >
          border: {palette.border}
        </button>
        <button className={styles.navBarElement} onClick={handleCopy}>
          copy text
        </button>
        {activePicker && (
          <div className={styles.pickerWrapper}>
            <Picker
              data={data}
              set="native"
              onEmojiSelect={handlePickerOnSelect}
            />
          </div>
        )}
      </div>
      <div>
        test
        {textGrid.map((el, index) => {
          return (
            <div key={`playground-row-${index}`}>
              {el.map((el2, index2) => {
                return (
                  <div className={styles.emojisRow} key={`playground-element-${index2}`}>
                    {el2.split(",").join("")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
