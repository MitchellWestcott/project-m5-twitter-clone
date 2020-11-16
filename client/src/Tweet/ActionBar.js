import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScaleIn } from "./LikeButton/ScaleIn";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ActionBar = (props) => {
  const { tweetId, numLikes, tweetLiked } = props;
  const [isLiked, setIsLiked] = useState(tweetLiked);
  const [numOfLikes, setNumOfLikes] = useState(numLikes);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setNumOfLikes(numOfLikes - 1);
      setIsLiked(false);
    } else {
      setNumOfLikes(numOfLikes + 1);
      setIsLiked(true);
    }
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: !isLiked }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  return (
    <Wrapper>
      <StyledFiMessageCircle tabIndex="0" aria-label="Message user" />
      <StyledFiRepeat tabIndex="0" />
      <Div>
        {isLiked ? (
          <ScaleIn>
            <RedFaHeart
              onClick={(e, tweetId) => {
                handleToggleLike(e, tweetId);
              }}
              tabIndex="0"
              aria-label="Liked tweet"
            />
          </ScaleIn>
        ) : (
          <StyledFiHeart
            onClick={(e, tweetId) => {
              handleToggleLike(e, tweetId);
            }}
            tabIndex="0"
            aria-label="Like tweet"
          />
        )}
        {!isLiked && <SpanHidden>00</SpanHidden>}
        {isLiked && <Span>{numOfLikes}</Span>}
      </Div>
      <StyledFiUpload tabIndex="0" aria-label="Forward tweet" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  /* margin: 20px 20px 20px 0px; */
`;
const StyledFiMessageCircle = styled(FiMessageCircle)`
  width: 20px;
  height: 20px;
  padding: 5px;
  &:hover {
    color: #1da1f2;
    background: #d6f0ff;
    border-radius: 20px;
  }
`;
const StyledFiRepeat = styled(FiRepeat)`
  width: 20px;
  height: 20px;
  padding: 5px;
  &:hover {
    color: #008080;
    background: #ebffff;
    border-radius: 20px;
  }
`;
const StyledFiHeart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  padding: 5px;
  &:hover {
    color: #ff3855;
    background: #ffccd3;
    border-radius: 20px;
  }
`;

const RedFaHeart = styled(FaHeart)`
  width: 20px;
  height: 20px;
  padding: 5px;
  color: #ff3855;
  background: #ffccd3;
  border-radius: 20px;
`;

const StyledFiUpload = styled(FiUpload)`
  width: 20px;
  height: 20px;
  padding: 5px;
  &:hover {
    color: #00aaee;
    background: #d9f4ff;
    border-radius: 20px;
  }
`;

const SpanHidden = styled.span`
  color: transparent;
`;
const Span = styled.span`
  color: black;
  margin-left: 5px;
`;

const Div = styled.div`
  width: 60px;
  height: 40px;
  align-items: center;
  display: flex;
`;

export default ActionBar;
