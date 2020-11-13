import React, { useContext } from "react";
import styled from "styled-components";
import AppNav from "./AppNav";

import { CurrentUserContext } from "./CurrentUserContext";

const App = (props) => {
  const { currentUser, status } = useContext(CurrentUserContext);
  return (
    <Main>
      <AppNav />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
`;

export default App;
