import React, { useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import ActionBar from "./ActionBar";

import { FiRepeat } from "react-icons/fi";

const Tweet = (props) => {
  const [likeTweet, setLikeTweet] = useState(false);
  const { tweet } = props;
  let history = useHistory();

  const handleTweetId = (e) => {
    e.stopPropagation();
    history.push(`/tweet/${tweet.id}`);
  };

  const tweetImage = tweet?.media?.map((media) => {
    return media.url;
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleTweetId(e);
    }
  };

  // console.log({ tweetInfoFromTweet: tweet.id });

  return (
    <Wrapper onKeyDown={handleKeyDown} onClick={handleTweetId} tabIndex="0">
      <ImageWrapper>
        {tweet.retweetFrom && <StyledFiRepeat />}
        <Avatar src={tweet.author.avatarSrc} />
      </ImageWrapper>
      <WrapperTwo>
        {tweet.retweetFrom && (
          <Retweet>{tweet.retweetFrom.displayName} remeowed</Retweet>
        )}
        <Header
          author={tweet.author.displayName}
          handle={tweet.author.handle}
          timestamp={tweet.timestamp}
        />
        <TweetContents>{tweet.status}</TweetContents>
        {tweetImage && <TweetImage src={tweetImage}></TweetImage>}
        <ActionBar
          tweetLikes={tweet.numLikes}
          tweetId={tweet.id}
          likeTweet={likeTweet}
        />
      </WrapperTwo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  width: 580px;
  padding: 16px;
  border-left: 1px solid rgb(230, 236, 240);
  border-right: 1px solid rgb(230, 236, 240);
  border-top: 1px solid rgb(230, 236, 240);
  display: flex;
  text-align: left;
  /* border: 1px solid blue; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WrapperTwo = styled.div`
  width: 100%;
`;

const StyledFiRepeat = styled(FiRepeat)`
  padding-right: 5px;
  color: rgb(101, 119, 134);
`;

const Retweet = styled.div`
  color: rgb(101, 119, 134);
  padding-bottom: 5px;
  font-size: 16px;
`;

const TweetContents = styled.div`
  font-size: 22px;
  width: 100%;
  margin-bottom: 10px;
  line-height: 26px;
`;

const TweetImage = styled.img`
  border-radius: 20px;
  height: auto;
  width: 100%;
  margin-bottom: 10px;
  /* padding-top: 10px; */
`;

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding-right: 5px;
  padding-top: 5px;
`;

const Divider = styled.div`
  height: 1px;
  margin-top: 15px;
  margin-bottom: 15px;
  background: rgb(230, 236, 240);
`;

export default Tweet;
