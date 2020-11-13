import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { GlobalStyles } from "./GlobalStyles";

import { COLORS } from "./constants";

import { ReactComponent as Logo } from "./assets/logo.svg";

import { FaCat } from "react-icons/fa";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

const Sidebar = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  // console.log(currentUser);
  return (
    <>
      <Main>
        <Wrapper>
          <StyledNavLinkTwo to="/home">
            <StyledLogo />
          </StyledNavLinkTwo>
        </Wrapper>
        <Div>
          <StyledNavLink to="/home">
            <StyledFiHome />
            <Span>Home</Span>
          </StyledNavLink>
        </Div>
        <Div>
          <StyledNavLink to={`/${currentUser?.handle}`}>
            <StyledFiUser />
            <Span>Profile</Span>
          </StyledNavLink>
        </Div>
        <Div>
          <StyledNavLink to="/notifications">
            <StyledFiBell />
            <Span>Notifications</Span>
          </StyledNavLink>
        </Div>
        <Div>
          <StyledNavLink to="/bookmarks">
            <StyledFiBookmark />
            <Span>Bookmarks</Span>
          </StyledNavLink>
        </Div>
      </Main>
    </>
  );
};

//for currentUser.handle add ternary for rendering later

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 23%;
`;

const Div = styled.div`
  /* padding: 20px; */
  display: inline-flex;
  align-items: center;
`;

const Wrapper = styled.div`
  /* display: block; */
`;

const StyledLogo = styled(Logo)`
  height: 28px;
  width: 28px;
  color: ${COLORS.linkbackground};
  padding: 8px;

  &:hover {
    background: ${COLORS.light};
    border-radius: 50%;
  }
`;

const StyledFiHome = styled(FiHome)`
  height: 20px;
  width: 20px;
`;

const StyledFiUser = styled(FiUser)`
  height: 20px;
  width: 20px;
`;

const StyledFiBell = styled(FiBell)`
  height: 20px;
  width: 20px;
`;

const StyledFiBookmark = styled(FiBookmark)`
  height: 20px;
  width: 20px;
`;

const StyledNavLinkTwo = styled(NavLink)``;

const StyledNavLink = styled(NavLink)`
  padding: 10px;
  color: black;
  text-decoration: none;
  font-family: sans-serif;

  &:hover {
    color: white;
    background: ${COLORS.linkbackground};
    border-radius: 15px;
  }

  &.active {
    color: ${COLORS.light};
  }

  &:focus {
    outline-color: orange;
  }
`;

const Span = styled.span`
  padding: 5px 10px 5px 10px;
  font-size: 22px;
  margin-left: 5px;
`;

export default Sidebar;
