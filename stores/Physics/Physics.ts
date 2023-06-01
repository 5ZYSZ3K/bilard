import THREE, { Matrix4, Vector3 } from "three";
import { TABLE_DIMENSIONS } from "./consts";
import { BallField, CueField, MeshRefType } from "./types";

class Physics {
  balls: Array<BallField>;

  cue: CueField;

  zoom: number;

  constructor(refs: Array<MeshRefType>, ref?: MeshRefType) {
    this.balls = refs.map((ref) => ({ ref, speed: { x: 0, y: 0, z: 0 } }));
    this.cue = { ref, speed: { x: 0, y: 0, z: 0 } };
    this.zoom = 1;
  }

  // helper function, not important
  setBallRefs(refs: Array<MeshRefType>) {
    this.balls = refs.map((ref) => ({ ref, speed: { x: 0, y: 0, z: 0 } }));
  }

  // helper function, not important
  setCueRefs(ref: MeshRefType) {
    this.cue = { ref, speed: { x: 0, y: 0, z: 0 } };
  }

  // function that saves the pinch scale
  setZoom(zoom: number) {
    this.zoom = zoom;
  }

  // function which marks a ball as pocketed (hides it if it is not a white ball, if it is a white ball - moves it to the center)
  pocketed(ballIndex: number) {
    const ball = this.balls[ballIndex];
    if (ball.ref.current?.position instanceof THREE.Vector3) {
      ball.speed.x = 0;
      ball.speed.y = 0;
      if (ballIndex === 0) {
        ball.ref.current.position.x = 0;
        ball.ref.current.position.y = 0;
      } else {
        ball.ref.current.position.x = 100;
        ball.ref.current.position.y = 100;
      }
    }
  }

  // A function that applies a force (actually a velocity) to a ball
  shoot(force: number, ballIndex: number, angle: number) {
    if (this.balls.length > ballIndex) {
      const speedX = Math.cos(angle) * force;
      const speedY = Math.sin(angle) * force;
      this.balls[ballIndex].speed.x = speedX;
      this.balls[ballIndex].speed.y = speedY;
    }
  }

  // A function that checks, if a collision occurred between two balls
  checkBallCollision(ball1Index: number, ball2Index: number) {
    const ball1 = this.balls[ball1Index];
    const ball2 = this.balls[ball2Index];

    if (!ball1.ref.current || !ball2.ref.current) return;
    if (
      !(
        ball1.ref.current.position instanceof THREE.Vector3 &&
        ball2.ref.current.position instanceof THREE.Vector3
      )
    )
      return;

    const dx = ball2.ref.current.position?.x - ball1.ref.current.position?.x;
    const dy = ball2.ref.current.position?.y - ball1.ref.current.position?.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 1) {
      const angle1 = Math.atan2(ball1.speed.y, ball1.speed.x);
      const angle2 = Math.atan2(ball2.speed.y, ball2.speed.x);

      const vel1 = Math.sqrt(
        ball1.speed.x * ball1.speed.x + ball1.speed.y * ball1.speed.y
      );
      const vel2 = Math.sqrt(
        ball2.speed.x * ball2.speed.x + ball2.speed.y * ball2.speed.y
      );

      const collisionAngle = Math.atan2(dy, dx);

      const aSpeedX =
        ((2 * vel2 * Math.cos(angle2 - collisionAngle)) / 2) *
          Math.cos(collisionAngle) +
        vel1 *
          Math.sin(angle1 - collisionAngle) *
          Math.cos(collisionAngle + Math.PI / 2);
      const aSpeedY =
        ((2 * vel2 * Math.cos(angle2 - collisionAngle)) / 2) *
          Math.sin(collisionAngle) +
        vel1 *
          Math.sin(angle1 - collisionAngle) *
          Math.sin(collisionAngle + Math.PI / 2);

      const bSpeedX =
        ((2 * vel1 * Math.cos(angle1 - collisionAngle)) / 2) *
          Math.cos(collisionAngle) +
        vel2 *
          Math.sin(angle2 - collisionAngle) *
          Math.cos(collisionAngle + Math.PI / 2);
      const bSpeedY =
        ((2 * vel1 * Math.cos(angle1 - collisionAngle)) / 2) *
          Math.sin(collisionAngle) +
        vel2 *
          Math.sin(angle2 - collisionAngle) *
          Math.sin(collisionAngle + Math.PI / 2);

      // Reset position outside of collision bounds.
      ball1.ref.current.position.x =
        ball2.ref.current.position.x -
        Math.round(Math.cos(collisionAngle) * 1000) / 1000;
      ball1.ref.current.position.y =
        ball2.ref.current.position.y -
        Math.round(Math.sin(collisionAngle) * 1000) / 1000;

      ball1.speed.x = aSpeedX;
      ball1.speed.y = aSpeedY;
      ball2.speed.x = bSpeedX;
      ball2.speed.y = bSpeedY;
    }
  }

  checkTableCollision(ballIndex: number) {
    const ball = this.balls[ballIndex];

    if (!ball.ref.current) return;
    if (!(ball.ref.current.position instanceof THREE.Vector3)) return;

    if (
      ball.ref.current.position.x + 1 > TABLE_DIMENSIONS.topRight.x ||
      ball.ref.current.position.x - 1 < TABLE_DIMENSIONS.topLeft.x
    ) {
      ball.speed.x *= -1;
    }
    if (
      ball.ref.current.position.y + 1 > TABLE_DIMENSIONS.topRight.y ||
      ball.ref.current.position.y - 1 < TABLE_DIMENSIONS.bottomRight.y
    ) {
      ball.speed.y *= -1;
    }

    if (
      (ball.ref.current.position.x - 1.3 < TABLE_DIMENSIONS.topLeft.x &&
        ball.ref.current.position.y + 1.3 > TABLE_DIMENSIONS.topLeft.y) ||
      (ball.ref.current.position.x + 1.3 > TABLE_DIMENSIONS.topRight.x &&
        ball.ref.current.position.y + 1.3 > TABLE_DIMENSIONS.topRight.y) ||
      (ball.ref.current.position.x - 1.3 < TABLE_DIMENSIONS.bottomLeft.x &&
        ball.ref.current.position.y - 1.3 < TABLE_DIMENSIONS.bottomLeft.y) ||
      (ball.ref.current.position.x + 1.3 > TABLE_DIMENSIONS.bottomRight.x &&
        ball.ref.current.position.y - 1.3 < TABLE_DIMENSIONS.bottomRight.y) ||
      (ball.ref.current.position.x - 0.5 < TABLE_DIMENSIONS.topLeft.x &&
        ball.ref.current.position.y < 1.2 &&
        ball.ref.current.position.y > -1.2) ||
      (ball.ref.current.position.x + 0.5 > TABLE_DIMENSIONS.topRight.x &&
        ball.ref.current.position.y < 1.2 &&
        ball.ref.current.position.y > -1.2)
    ) {
      this.pocketed(ballIndex);
    }
  }

  moveBall(ballIndex: number, delta: number, coeff: number) {
    const ball = this.balls[ballIndex];

    if (!ball.ref.current) return;
    if (!(ball.ref.current.position instanceof THREE.Vector3)) return;

    // Setting rolling resistance.
    ball.speed.x *= 1 - coeff * delta;
    ball.speed.y *= 1 - coeff * delta;

    // Set new position according to x/y speed.
    const stepX = ball.speed.x * delta;
    const stepY = ball.speed.y * delta;

    ball.ref.current.position.set(
      ball.ref.current.position.x + stepX,
      ball.ref.current.position.y + stepY,
      0
    );

    let tempMat = new Matrix4();
    tempMat.makeRotationAxis(new Vector3(0, 1, 0), stepX / 0.5);
    // @ts-ignore
    tempMat.multiply(ball.ref.current.matrix);
    ball.ref.current.matrix = tempMat;
    tempMat = new Matrix4();
    tempMat.makeRotationAxis(new Vector3(1, 0, 0), -stepY / 0.5);
    // @ts-ignore
    tempMat.multiply(ball.ref.current.matrix);
    ball.ref.current.matrix = tempMat;
    // @ts-ignore
    ball.ref.current.rotation?.setFromRotationMatrix(ball.ref.current.matrix);
  }
}

export default Physics;
