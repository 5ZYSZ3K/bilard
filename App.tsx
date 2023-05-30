import { View, StyleSheet, TouchableNativeFeedback, Text } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import React, { useRef } from "react";
import Scene from "./components/Scene";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import useThrottledState from "./hooks/useThrottledState";
import Physics from "./stores/Physics/Physics";
import PhysicsProvider from "./stores/Physics/provider";

export default function App() {
  const cueRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const zeroBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const oneBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const twoBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const threeBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const fourBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const fiveBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const sixBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const sevenBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const eightBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const nineBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const tenBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const elevenBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const twelveBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const thirteenBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const fourteenBallRef = useRef<JSX.IntrinsicElements["mesh"]>();
  const fifteenBallRef = useRef<JSX.IntrinsicElements["mesh"]>();

  const allBallRefs = [
    zeroBallRef,
    oneBallRef,
    twoBallRef,
    threeBallRef,
    fourBallRef,
    fiveBallRef,
    sixBallRef,
    sevenBallRef,
    eightBallRef,
    nineBallRef,
    tenBallRef,
    elevenBallRef,
    twelveBallRef,
    thirteenBallRef,
    fourteenBallRef,
    fifteenBallRef,
  ];

  const physics = new Physics(allBallRefs);

  return (
    <PhysicsProvider store={physics}>
      <View style={[styles.container]}>
        <Canvas style={{ width: "100%" }} camera={{ position: [0, 0, 40] }}>
          <Scene />
        </Canvas>
        <TouchableNativeFeedback
          style={{
            position: "absolute",
            height: 40,
            bottom: 10,
            width: "60%",
            left: "20%",
            backgroundColor: "cyan",
            alignItems: "center",
          }}
          onPress={() => {
            if (zeroBallRef) {
              physics.shoot(1, 0);
            }
          }}
        >
          <Text>Hit</Text>
        </TouchableNativeFeedback>
      </View>
    </PhysicsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
