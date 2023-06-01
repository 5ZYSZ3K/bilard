import React, { Suspense, useRef } from "react";
import Table from "../Table";
import Ball from "../Ball";
import usePhysics from "../../stores/Physics/hook";
import { useFrame } from "@react-three/fiber/native";
import Cue from "../Cue";
import { Vector3 } from "three";
const zero = require("../../assets/0.png");
const one = require("../../assets/1.png");
const two = require("../../assets/2.png");
const three = require("../../assets/3.png");
const four = require("../../assets/4.png");
const five = require("../../assets/5.png");
const six = require("../../assets/6.png");
const seven = require("../../assets/7.png");
const eight = require("../../assets/8.png");
const nine = require("../../assets/9.png");
const ten = require("../../assets/10.png");
const eleven = require("../../assets/11.png");
const twelve = require("../../assets/12.png");
const thirteen = require("../../assets/13.png");
const fourteen = require("../../assets/14.png");
const fifteen = require("../../assets/15.png");

const Scene: React.FC = () => {
  const physics = usePhysics();

  useFrame(({ camera }, delta) => {
    const deltaTime = 60 * delta;
    camera.position.z = 40 / physics.zoom;

    for (let i = 0; i < 16; i += 1) {
      for (let j = i + 1; j < 16; j += 1) {
        if (i !== j) {
          physics.checkBallCollision(i, j);
        }
      }
      physics.checkTableCollision(i);
      physics.moveBall(i, deltaTime, 0.01);
    }
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense>
        <Table />
        <object3D>
          <Ball
            setRef={physics.balls[0].ref}
            position={[0, -16, 0]}
            texture={zero}
          />
          {physics.cue.ref ? (
            <Cue setRef={physics.cue.ref} position={new Vector3(0, 0, -1)} />
          ) : null}
          <Ball
            setRef={physics.balls[1].ref}
            position={[-1.01, 15, 0]}
            texture={one}
          />
          <Ball
            setRef={physics.balls[2].ref}
            position={[1.01, 17, 0]}
            texture={two}
          />
          <Ball
            setRef={physics.balls[3].ref}
            position={[-0.51, 16, 0]}
            texture={three}
          />
          <Ball
            setRef={physics.balls[4].ref}
            position={[-1.01, 17, 0]}
            texture={four}
          />
          <Ball
            setRef={physics.balls[5].ref}
            position={[-2.02, 17, 0]}
            texture={five}
          />
          <Ball
            setRef={physics.balls[6].ref}
            position={[1.53, 16, 0]}
            texture={six}
          />
          <Ball
            setRef={physics.balls[7].ref}
            position={[0.51, 14, 0]}
            texture={seven}
          />
          <Ball
            setRef={physics.balls[8].ref}
            position={[0, 15, 0]}
            texture={eight}
          />
          <Ball
            setRef={physics.balls[9].ref}
            position={[0, 13, 0]}
            texture={nine}
          />
          <Ball
            setRef={physics.balls[10].ref}
            position={[0.51, 16, 0]}
            texture={ten}
          />
          <Ball
            setRef={physics.balls[11].ref}
            position={[2.02, 17, 0]}
            texture={eleven}
          />
          <Ball
            setRef={physics.balls[12].ref}
            position={[-0.51, 14, 0]}
            texture={twelve}
          />
          <Ball
            setRef={physics.balls[13].ref}
            position={[0, 17, 0]}
            texture={thirteen}
          />
          <Ball
            setRef={physics.balls[14].ref}
            position={[-1.53, 16, 0]}
            texture={fourteen}
          />
          <Ball
            setRef={physics.balls[15].ref}
            position={[1.01, 15, 0]}
            texture={fifteen}
          />
        </object3D>
      </Suspense>
    </>
  );
};

export default Scene;
