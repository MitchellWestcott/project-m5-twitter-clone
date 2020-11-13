import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "./constants";

const TweetInput = ({ user }) => {
  const [charCount, setCharCount] = useState(280);
  const [maxedChar, setMaxedChar] = useState(false);
  const [tweetContents, setTweetContents] = useState("");
  const [tweetStatus, setTweetStatus] = useState("loading");

  //   console.log({ useInInput: user });
  const handleCharCount = (event) => {
    setCharCount(280 - event.target.value.length);
    setTweetContents(event.target.value);
    // console.log({ inputinnertext: tweetContents });
    // console.log({ characterCount: charCount });
  };

  useEffect(() => {
    if (charCount < 0 || charCount > 278) {
      setMaxedChar(true);
    } else {
      setMaxedChar(false);
    }
  }, [charCount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTweetStatus("loading");
    setTweetContents("");
    setCharCount(280);
    document.getElementById("input").value = "";
    await fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: `${tweetContents}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log({ datafromtweentinput: data });
      });
  };

  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar src={user?.avatarSrc} />
      </AvatarWrapper>
      <InputWrapper>
        <TweetForm onSubmit={handleSubmit}>
          <Input
            type="text"
            id="input"
            autoComplete="off"
            placeholder={"What's happening?"}
            onInput={handleCharCount}
          ></Input>
          <Characters>
            {charCount >= 56 && <NormalFont>{charCount}</NormalFont>}
            {charCount <= 55 && charCount >= 0 && (
              <WarningFont>{charCount}</WarningFont>
            )}
            {charCount < 0 && <RedFont>{charCount}</RedFont>}
            <Submit type="submit" disabled={maxedChar}>
              Meow
            </Submit>
          </Characters>
        </TweetForm>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  /* padding-bottom: 10px; */
  border: 1px solid rgb(230, 236, 240);
  width: 612px;
`;

const Div = styled.div`
  padding-top: 20px;
`;

const AvatarWrapper = styled.div`
  width: 100px;
  display: flex;
  height: 180px;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  /* padding-right: 5px; */
  /* padding-top: 5px; */
  margin-top: 25px;
`;

const InputWrapper = styled.div`
  width: 100%;
  /* height: 100px; */
`;

const TweetForm = styled.form`
  width: 80%;
  box-sizing: border-box;
  /* padding: 0; */
  display: block;
`;

const Submit = styled.button`
  width: 100px;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  background: none;
  background-color: ${COLORS.primary};
  border-radius: 25px;
  color: white;
  border: none;
  cursor: pointer;
  outline: inherit;
  margin-left: 20px;

  &:hover {
    background-color: ${COLORS.linkbackground};
  }

  &:disabled {
    cursor: default;
    background-color: ${COLORS.linkbackground};
  }
`;

const Characters = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  padding: 10px;
  width: 100%;
  border-top: 1px solid rgb(230, 236, 240);
`;

const NormalFont = styled.p`
  color: grey;
`;

const RedFont = styled.p`
  color: red;
`;

const WarningFont = styled.p`
  color: orange;
`;

const Input = styled.textarea`
  width: 100%;
  height: 75px;
  margin-top: 20px;
  padding: 10px;
  border: none;
  font-family: sans-serif;
  font-size: 20px;
  display: block;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export default TweetInput;
