import React from "react";
import styled from "styled-components";
import { random } from "../../utils";
import { Particle } from "./Particle";

export const ConfettiPiece = ({ angle, distance, color }) => {
  const size = 10;
  return (
    <>
      <CenteredWithinParent>
        <Particle angle={angle} distance={distance} color={color}>
          {" "}
          <Circle
            style={{
              width: random(size, size + 10),
              height: size,
              backgroundColor: color,
            }}
          />
        </Particle>
      </CenteredWithinParent>
    </>
  );
};

const Circle = styled.div`
  border-radius: 50%;
`;

const CenteredWithinParent = styled.div`
  position: absolute;
`;
