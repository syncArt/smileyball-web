import { useState } from "react";

export const useLayoutManipulators = () => {
  const [isColumn, switchGrid] = useState(false);
  const [isBorder, setBorder] = useState(false);
  const [isSquare, setSquare] = useState(false);

  return [
    {
      isColumn,
      isBorder,
      isSquare,
    },
    { switchGrid, setBorder, setSquare },
  ];
};
