import { type Dispatch } from "react";

export type UseThrottledState = (
  initialValue: number,
  throttleValue: number
) => [number, Dispatch<number>];
