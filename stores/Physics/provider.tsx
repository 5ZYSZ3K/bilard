import PhysicsContext from "./context";
import { PhysicsProviderProps } from "./types";

const PhysicsProvider: React.FC<PhysicsProviderProps> = ({
  children,
  store,
}) => {
  return (
    <PhysicsContext.Provider value={store}>{children}</PhysicsContext.Provider>
  );
};

export default PhysicsProvider;
