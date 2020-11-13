import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";

// import { CurrentUserContext } from "./CurrentUserContext";

const Header = (props) => {
  //   console.log(props);
  const history = useHistory();
  const { author, handle, timestamp } = props;

  const handleClick = (e) => {
    e.stopPropagation();
    history.push(`/${handle}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleClick(e);
    }
  };

  return (
    <Wrapper>
      <Name>
        <DisplayName onClick={handleClick} onKeyDown={handleKeyDown}>
          {author}
        </DisplayName>
        <Username onClick={handleClick} onKeyDown={handleKeyDown}>
          @{handle}
        </Username>
        <TimeStamp>{moment(timestamp).startOf("day").fromNow()}</TimeStamp>
      </Name>
    </Wrapper>
  );
};

//displayName should be a navlink, entire tweet should be button
//displayName to=
//to avoid the double button problem you can push to history
//preventpropagation

const Wrapper = styled.header`
  display: flex;
`;

const Name = styled.div`
  flex: 1;
  display: flex;
  justify-content: left;
`;

const DisplayName = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(101, 119, 134);
  padding-left: 10px;
`;

const TimeStamp = styled.div`
  font-size: 15px;
  line-height: 18px;
  color: rgb(101, 119, 134);
  padding-left: 15px;
`;

export default Header;
