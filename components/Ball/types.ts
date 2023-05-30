import { type MeshProps } from "@react-three/fiber/native";

export type BallProps = {
  texture: NodeRequire;
  position?: [number, number, number];
  setRef: React.MutableRefObject<MeshProps | undefined>;
};
