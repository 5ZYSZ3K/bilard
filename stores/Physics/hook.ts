import { useContext } from "react";
import type Physics from "./Physics";
import PhysicsContext from "./context";

const usePhysics = (): Physics => {
  const physics = useContext(PhysicsContext);
  if (!physics) throw new Error("No physics available");

  return physics;
};

export default usePhysics;
