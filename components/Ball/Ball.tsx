import { useFrame, useLoader } from "@react-three/fiber/native";
import { useRef, useState } from "react";
import { BallProps } from "./types";
import { TextureLoader } from "expo-three";

const Ball: React.FC<BallProps> = ({ setRef, texture, ...props }) => {
  const [active, setActive] = useState(false);

  // @ts-ignore
  const [textureMesh] = useLoader(TextureLoader, [texture]);

  return (
    <mesh
      {...props}
      scale={active ? 2 : 1}
      // @ts-ignore
      ref={setRef}
      onClick={(state) => setActive(!state)}
    >
      <sphereGeometry attach="geometry" args={[0.5, 128, 128]} />
      <meshStandardMaterial map={textureMesh} />
    </mesh>
  );
};

export default Ball;
