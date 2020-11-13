import React from "react";
import styled, { keyframes } from "styled-components";

// import { TweetContext } from "../Tweet/TweetContext";

export const PoppingCircle = ({ size, color }) => {
  //   const { isLikedByCurrentUser } = TweetContext();
  return (
    <Wrapper
      style={{
        width: size,
        height: size,
        background: color,
      }}
    ></Wrapper>
  );
};

const fadeIn = keyframes`
from {
    opacity: 1;
} 
to {
    opacity: 0;
}`;

const expand = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`;

const Wrapper = styled.div`
  border-radius: 50%;
  position: absolute;
  animation: ${fadeIn} 450ms forwards, ${expand} 350ms forwards;
`;
