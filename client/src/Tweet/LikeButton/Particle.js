import React from "react";
import { useSpring, animated } from "react-spring";
import { random } from "../../utils";

export const Particle = ({ children, angle, distance }) => {
  const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

  const angleInRads = convertDegreesToRadians(angle);

  const x = Math.cos(angleInRads) * distance;
  const y = Math.sin(angleInRads) * distance;
  const particleTransform = useSpring({
    transform: `translate(${x}px, ${y}px) scale(0)`,
    from: {
      transform: `translate(0px, 0px) scale(1)`,
    },
    config: {
      tension: random(150, 300),
      friction: random(15, 35),
    },
    delay: random(0, 120),
  });

  return (
    <animated.div style={{ ...particleTransform }}>{children}</animated.div>
  );
};
