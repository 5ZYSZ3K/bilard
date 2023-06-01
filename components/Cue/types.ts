import { MeshProps } from "@react-three/fiber/native";

export type CueProps = {
  setRef: React.MutableRefObject<MeshProps | undefined>;
  position: THREE.Vector3;
};
