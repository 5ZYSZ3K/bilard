import { type Dispatch, useState } from "react";
import { UseThrottledState } from "./types";

const useThrottledState: UseThrottledState = (initialValue, throttleValue) => {
  const [state, setState] = useState(initialValue);

  const setThrottledState: Dispatch<number> = (value) => {
    if (typeof value === "number" && Math.abs(value - state) < throttleValue) {
      setState(value);
    }
  };

  return [state, setThrottledState];
};

export default useThrottledState;
