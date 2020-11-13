import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

const ActionBar = (props) => {
  const { tweetLikes, tweetId, likeTweet } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(null);
  // console.log({ buttonTest: isLiked, numOfLikes });

  // const handleToggleLike = (e) => {
  //   e.stopPropagation();
  //   if (isLiked) {
  //     setNumOfLikes(numOfLikes - 1);
  //     setIsLiked(false);
  //   } else {
  //     setNumOfLikes(numOfLikes + 1);
  //     setIsLiked(true);
  //   }
  // };

  // console.log(onLikeClick);

  const handleLike = (e) => {
    e.stopPropagation();
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: isLiked }),
    }).then((res) => res.json());
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     e.stopPropagation();
  //     onLikeClick(e);
  //   }
  // };

  return (
    <Wrapper>
      <StyledFiMessageCircle tabIndex="0" />
      <StyledFiRepeat tabIndex="0" />
      <StyledFiHeart
        onClick={() => {
          // onLikeClick(tweetId);
        }}
        // onClick={handleLike}
        // onKeyDown={handleKeyDown(tweetId)}
        tabIndex="0"
      />
      {isLiked && <div>wowee</div>}
      <StyledFiUpload tabIndex="0" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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

export default ActionBar;
