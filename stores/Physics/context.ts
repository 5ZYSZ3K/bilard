import { createContext } from "react";
import Physics from "./Physics";

const PhysicsContext = createContext<Physics | undefined>(undefined);

export default PhysicsContext;
