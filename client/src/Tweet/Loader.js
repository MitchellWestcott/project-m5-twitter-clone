import React from "react";
import styled from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";

import { COLORS } from "../constants";

const Loader = () => {
  return (
    <>
      <Div>
        <SyncLoader size={30} color={COLORS.linkbackground} />
      </Div>
    </>
  );
};

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

export default Loader;
