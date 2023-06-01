import { GestureHandlerRootView } from "react-native-gesture-handler";
import Physics from "./stores/Physics/Physics";
import App from "./App";
import PhysicsProvider from "./stores/Physics/provider";
import { registerRootComponent } from "expo";

const Root: React.FC = () => {
  const physics = new Physics([]);

  return (
    <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
      <PhysicsProvider store={physics}>
        <App />
      </PhysicsProvider>
    </GestureHandlerRootView>
  );
};

registerRootComponent(Root);
