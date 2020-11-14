import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import Loader from "./Tweet/Loader";

import ActionBar from "./Tweet/ActionBar";
import { VscArrowLeft } from "react-icons/vsc";
import { COLORS } from "./constants";

const TweetDetails = () => {
  const [currentTweet, setCurrentTweet] = useState(null);
  const [status, setStatus] = useState("loading");
  const { tweetId } = useParams();
  const [numLikes, setNumLikes] = useState(null);
  const [tweetLiked, setTweetLiked] = useState(null);

  const history = useHistory();

  const handleGoBack = (e) => {
    history.goBack();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    history.push(`/${currentTweet.author.handle}`);
  };

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCurrentTweet(data.tweet);
          setStatus("idle");
          setNumLikes(data?.tweet?.numLikes);
          setTweetLiked(data?.tweet?.isLiked);
        }
      });
  }, [tweetId]);

  const tweetImage = currentTweet?.media?.map((media) => {
    return media.url;
  });

  // console.log({ currentTweetInfo: currentTweet });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleGoBack(e);
    }
  };

  const handleKeyDownUser = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleClick(e);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Div>
            <Header>
              <ChevronDiv>
                <StyledVscChevronLeft
                  onClick={handleGoBack}
                  onKeyDown={handleKeyDown}
                  tabIndex="0"
                  aria-label="Go back"
                />
              </ChevronDiv>

              <Span>Meow</Span>
            </Header>
            <Divider />
            <Wrapper>
              <UserWrapper>
                <Avatar src={currentTweet?.author?.avatarSrc} />
                <HandleWrapper>
                  <Name
                    onClick={handleClick}
                    onKeyDown={handleKeyDownUser}
                    tabIndex={0}
                    aria-label="Go to user's profile"
                  >
                    {currentTweet?.author?.displayName}
                  </Name>
                  <Handle>@{currentTweet?.author?.handle}</Handle>
                </HandleWrapper>
              </UserWrapper>
              <Status>{currentTweet?.status}</Status>
              <TweetMedia src={tweetImage} />
              <DateWrapper>
                <TimeStamp>
                  {moment(currentTweet?.timestamp).format("hh:mm A")} •{" "}
                  {moment(currentTweet?.timestamp).format("MMM Do YYYY")} •{" "}
                </TimeStamp>
                <AppSpan> Critter Web App</AppSpan>
              </DateWrapper>
              {/* <Divider />
              <LikesSection>
                <LikeNumber>
                  {currentTweet?.numLikes}
                  <LikeText> Likes</LikeText>
                </LikeNumber>
                <RetweetNumber>
                  {currentTweet?.numRetweets}
                  <RetweetText> Retweets</RetweetText>
                </RetweetNumber>
              </LikesSection> */}
              <Divider />
              <ActionBarWrapper>
                <ActionBar
                  tweetLiked={currentTweet.isLiked}
                  numLikes={currentTweet.numLikes}
                  tweetId={tweetId}
                />
              </ActionBarWrapper>
              <Divider />
            </Wrapper>
          </Div>
        </>
      )}
    </>
  );
};

const Div = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  padding-left: 20px;
  width: 60%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px 10px 0px;
  width: 100px;
`;

const ChevronDiv = styled.div`
  width: 40px;
  height: 30px;
`;

const StyledVscChevronLeft = styled(VscArrowLeft)`
  width: 28px;
  height: 28px;
  padding: 2px;
  color: black;

  &:hover {
    color: white;
    background: ${COLORS.linkbackground};
    border-radius: 18px;
  }
`;

const Span = styled.span`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 0 15px;
`;

const Divider = styled.div`
  border-bottom: 1px solid rgb(230, 236, 240);
  /* padding-top: 10px; */
`;

const Wrapper = styled.div`
  width: 100%;
  /* display: */
`;

const UserWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const HandleWrapper = styled.div``;

const Name = styled.h1`
  font-size: 20px;
  font-weight: bold;
  padding-left: 10px;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Handle = styled.p`
  font-size: 16px;
  padding-left: 10px;
  margin: 0;
  color: rgb(101, 119, 134);
`;

const Status = styled.p`
  font-size: 24px;
  margin: 0;
`;

const TweetMedia = styled.img`
  width: 100%;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0;
  font-size: 18px;
  color: rgb(101, 119, 134);
`;

const LikesSection = styled.div`
  display: flex;
  margin: 0;
  justify-content: flex-start;
`;

const LikeNumber = styled.p`
  font-weight: bold;
`;

const LikeText = styled.span`
  color: rgb(101, 119, 134);
  font-weight: 400;
`;

const RetweetNumber = styled.p`
  padding-left: 10px;
  font-weight: bold;
`;

const RetweetText = styled.span`
  color: rgb(101, 119, 134);
  font-weight: 400;
`;

const TimeStamp = styled.p``;

const AppSpan = styled.span`
  padding-left: 5px;
`;

const ActionBarWrapper = styled.div`
  padding: 10px 0px 10px 0px;
  align-items: center;
  width: 100%;
`;

export default TweetDetails;
