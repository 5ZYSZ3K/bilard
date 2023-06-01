import React from "react";
import { CueProps } from "./types";

const Cue: React.FC<CueProps> = ({ position, setRef }) => {
  return (
    //@ts-ignore
    <mesh position={position} ref={setRef}>
      <cylinderGeometry attach="geometry" args={[0.1, 0.15, 12, 32, 32]} />
      <meshPhongMaterial attach="material" color="cyan" />
    </mesh>
  );
};

export default Cue;
