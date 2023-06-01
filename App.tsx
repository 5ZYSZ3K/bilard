import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import React, { useEffect, useRef } from "react";
import Scene from "./components/Scene";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
  PinchGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import THREE from "three";
import usePhysics from "./stores/Physics/hook";

export default function App() {
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
  const cueRef = useRef<JSX.IntrinsicElements["mesh"]>();

  const physics = usePhysics();

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

  useEffect(() => {
    physics.setBallRefs(allBallRefs);
    physics.setCueRefs(cueRef);
  }, []);

  const adjustCuePosition = (
    event: GestureUpdateEvent<
      PanGestureHandlerEventPayload & PanGestureChangeEventPayload
    >
  ) => {
    if (
      physics.cue.ref?.current?.position instanceof THREE.Vector3 &&
      physics.cue.ref.current.rotation instanceof THREE.Euler &&
      physics.balls.length &&
      physics.balls[0].ref.current?.position instanceof THREE.Vector3
    ) {
      const angle = -Math.atan2(-event.translationY, -event.translationX);
      physics.cue.ref.current.position.x =
        physics.balls[0].ref.current.position.x -
        6 * Math.cos(angle) +
        event.translationX / 50;
      physics.cue.ref.current.position.y =
        physics.balls[0].ref.current.position.y -
        6 * Math.sin(angle) -
        event.translationY / 50;
      physics.cue.ref.current.position.z = 0.5;
      physics.cue.ref.current.rotation.z = angle - Math.PI / 2;
    }
  };

  const shoot = (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    const angle = -Math.atan2(-event.translationY, -event.translationX);
    const force = Math.sqrt(
      Math.pow(event.translationX, 2) + Math.pow(event.translationY, 2)
    );
    physics.shoot(force / 250, 0, angle);

    if (physics.cue.ref?.current?.position instanceof THREE.Vector3) {
      physics.cue.ref.current.position.x = 0;
      physics.cue.ref.current.position.y = 0;
      physics.cue.ref.current.position.z = -1;
    }
  };

  const setZoom = (
    event: GestureUpdateEvent<PinchGestureHandlerEventPayload>
  ) => {
    physics.setZoom(event.scale);
  };

  const gesture = Gesture.Race(
    Gesture.Pan().onChange(adjustCuePosition).onEnd(shoot),
    Gesture.Pinch().onChange(setZoom)
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.container]}>
        <Canvas style={{ width: "100%" }} camera={{ position: [0, 0, 40] }}>
          <Scene />
        </Canvas>
      </View>
    </GestureDetector>
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
