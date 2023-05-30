import { MeshProps } from "@react-three/fiber";

export type SceneProps = {
  zoom: number;
  cueRef: React.MutableRefObject<MeshProps | undefined>;
  zeroBallRef: React.MutableRefObject<MeshProps | undefined>;
};
