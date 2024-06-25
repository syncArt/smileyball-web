import {initAsciiOptions} from "@/models/initAsciiOptions";
import ASCII_3x4_letters_builder_function from "@/models/libs/ASCII_3x4_letters_builder_function";

const maxVal = (arr) => arr.reduce((max, val) => (max > val ? max : val));

export const longestCharArrNumbersInRowFunc = (letterMap) =>
    letterMap.reduce(
        (prev, current) => (prev.length > current.length ? prev : current),
        [0]
    );

const addBackgroundBorderForALetter = (
    letterMap,
    longestRow,
    initValues,
    isColumn
) => {
    const longestCharArrNumbersInRow =
        longestCharArrNumbersInRowFunc(letterMap).length;

    const letterMapWithBackground = letterMap.map((el) => {
        if (isColumn && longestRow > el.length) {
            const isEven = (longestRow - el.length) % 2;
            if (!isEven) {
                const backgroundCharsToAdd = (longestRow - el.length) / 2;
                const charsArr = Array.from(
                    { length: backgroundCharsToAdd + 1 },
                    () => initValues.background
                );
                return [...charsArr, ...el, ...charsArr];
            }
            const backgroundCharsToAdd = (longestRow - el.length) / 2;
            const charsArrLeft = Array.from(
                { length: backgroundCharsToAdd + 1 },
                () => initValues.background
            );
            const charsArrRight = Array.from(
                { length: backgroundCharsToAdd + 2 },
                () => initValues.background
            );
            return [...charsArrLeft, ...el, ...charsArrRight];
        }
        return [initValues.background, ...el, initValues.background];
    });
    return [
        fr(
            (isColumn ? longestRow : longestCharArrNumbersInRow) + 2,
            initValues.background
        ),
        ...letterMapWithBackground,
        fr(
            (isColumn ? longestRow : longestCharArrNumbersInRow) + 2,
            initValues.background
        ),
    ];
};

const ASCIIArr = (arrFromText, initValues, longestRow, isColumn) => {
    return arrFromText.map((el, index) => {
        const letterMap = ASCII_3x4_letters_builder_function[el](initValues.main, initValues.background);
        const longestCharArrNumbersInRow =
            longestCharArrNumbersInRowFunc(letterMap).length;
        const lettersWithOutline = addBackgroundBorderForALetter(
            letterMap,
            longestRow,
            initValues,
            isColumn
        );
        if (isColumn && !!initValues.border) {
            return lettersWithOutline.map((row) => {
                return `${initValues.border}${row.join("")}${initValues.border}`;
            });
        }
        if (!isColumn && !!initValues.border) {
            const lettersWithTopBottomBorder = [
                fr(
                    (isColumn ? longestRow : longestCharArrNumbersInRow) + 2,
                    initValues.border
                ),
                ...lettersWithOutline,
                fr(
                    (isColumn ? longestRow : longestCharArrNumbersInRow) + 2,
                    initValues.border
                ),
            ];
            return lettersWithTopBottomBorder.map((row) => {
                return index === 0
                    ? `${initValues.border}${row.join("")}`
                    : index === arrFromText.length - 1
                        ? `${row.join("")}${initValues.border}`
                        : row;
            });
        }
        return lettersWithOutline;
    });
};

const getLongestRow = (arrFromText, initValues) => {
    const longestCharArrNumbersFullText = arrFromText.map(
        (el) =>
            longestCharArrNumbersInRowFunc(
                ASCII_3x4_letters_builder_function[el](initValues.main, initValues.background)
            ).length
    );
    return maxVal(longestCharArrNumbersFullText);
};

const singleRowGeneratedASCII = (textToPrint, asciiObj, isColumn) => {
    const arrFromText = Array.from(textToPrint);
    const initValues = initAsciiOptions(asciiObj);
    const longestRow = getLongestRow(arrFromText, initValues);

    if (initValues.border && isColumn) {
        return [
            [fr(longestRow + 4, initValues.border)],
            ...ASCIIArr(arrFromText, initValues, longestRow, isColumn),
            [fr(longestRow + 4, initValues.border)],
        ];
    }
    return ASCIIArr(arrFromText, initValues, longestRow, isColumn);
};

// will replace variables with passed ascii
export const generateASCII = (
    arrayOfTextToPrint,
    asciiObj,
    isColumn,
    isSquare
) => {
    const onlyText = arrayOfTextToPrint.map((singleWord) =>
        singleRowGeneratedASCII(singleWord, asciiObj, isColumn)
    );

    if (!isSquare) {
        return onlyText;
    }

    const [xDimension, yDimension] = checkResolution(onlyText);
    const rowsAmount = onlyText.length;

    if (xDimension > yDimension) {

        const amountToAdd = xDimension - yDimension;
        const isOdd = amountToAdd % 2;
        const arr = fr(amountToAdd + 6, asciiObj.background);
        const topBottomArr = Array.from(
            { length: amountToAdd / 2 },
            () => ""
        );
        const topBottomArrForOdd = Array.from(
            { length: (amountToAdd / 2)  },
            () => ""
        );
        onlyText.unshift([[...topBottomArr.map(() => arr)]]);
        onlyText.push([
            isOdd
                ? [...topBottomArrForOdd.map(() => arr)]
                : [...topBottomArr.map(() => arr)],
        ]);
        return onlyText;
    }

    if (xDimension < yDimension) {

    }

    return onlyText;
};

//fill row
export const fr = (amount, ascii) => {
    return Array.from({ length: amount }, () => ascii);
};

//check what resolution for art
export const checkResolution = (array) => {
    const rows = array.length;
    const letterHigh = array[0][0].length;

    const yDimension = rows * letterHigh;

    // go thru rows with reduce
    let xDimension = array.reduce((prev, current) => {
        let longestInRow = 0;
        //check each row, each row has letters amount...
        current.forEach((el) => {
            //single letter has set how many X pixels it gets so just sum all letters
            longestInRow = longestInRow + el[0].length;
        });
        return prev > longestInRow ? prev : longestInRow;
    }, 0);

    return [xDimension, yDimension];
};

export const checkLetterResolution = (array) => {
    console.log(array);
}