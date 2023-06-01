import { useFrame, useLoader } from "@react-three/fiber/native";
import { useRef, useState } from "react";
import { BallProps } from "./types";
import { TextureLoader } from "expo-three";

const Ball: React.FC<BallProps> = ({ setRef, texture, ...props }) => {
  // @ts-ignore
  const [textureMesh] = useLoader(TextureLoader, [texture]);

  return (
    // @ts-ignore
    <mesh {...props} ref={setRef}>
      <sphereGeometry attach="geometry" args={[0.5, 128, 128]} />
      <meshStandardMaterial map={textureMesh} />
    </mesh>
  );
};

export default Ball;
