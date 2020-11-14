import React from "react";
import styled from "styled-components";
import { GiWhiteCat } from "react-icons/gi";
import { COLORS } from "./constants";

const ErrorPage = () => {
  return (
    <Wrapper>
      <StyledGiWhiteCat />
      <Error>An unknown error has occured.</Error>
      <Inst>
        Please try refreshing the page, or <Link>contact support</Link> if the
        problem persists.
      </Inst>
    </Wrapper>
  );
};
const Inst = styled.p`
  font-size: 18px;
  text-align: center;
  font-family: sans-serif;
`;
const Error = styled.h1`
  font-size: 24px;
  font-family: sans-serif;
`;

const Link = styled.span`
  color: blue;
  text-decoration: underline;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 200px;
  margin: 100px auto 0 auto;
`;
const StyledGiWhiteCat = styled(GiWhiteCat)`
  color: ${COLORS.linkbackground};
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;
export default ErrorPage;
