import { type MeshProps } from "@react-three/fiber/native";
import { ReactNode } from "react";
import type Physics from "./Physics";

export type MeshRefType = React.MutableRefObject<MeshProps | undefined>;

export type BallField = {
  ref: MeshRefType;
  speed: {
    x: number;
    y: number;
    z: number;
  };
};

export type PhysicsProviderProps = {
  children: ReactNode;
  store: Physics;
};
