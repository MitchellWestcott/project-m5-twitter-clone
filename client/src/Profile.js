import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import moment from "moment";
import { COLORS } from "../src/constants";
import Tweet from "./Tweet/Tweet";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import Loader from "./Tweet/Loader";
import ErrorPage from "./ErrorPage";

const Profile = () => {
  const { profileId } = useParams();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profileStatus, setProfileStatus] = useState("loading");
  const [currentTweets, setCurrentTweets] = useState(null);
  const [tweetStatus, setTweetStatus] = useState("loading");

  // console.log("current profile", currentProfile);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentProfile(data.profile);
        setProfileStatus("idle");
        // console.log("profile", data.profile);
      })
      .catch((error) => {
        setProfileStatus("error");
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log({ datafromprofile: data });
        const tweets = Object.values(data.tweetsById);
        const sortedTweets = tweets.sort((a, b) =>
          a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
        );
        setCurrentTweets(sortedTweets);
        setTweetStatus("idle");
      })
      .catch((error) => {
        setTweetStatus("error");
      });
  }, [profileId]);

  //add one for ${profileId}/feed

  return (
    <>
      {!currentProfile || profileStatus === "error" ? (
        <ErrorPage />
      ) : (
        <>
          {!currentProfile || profileStatus === "loading" ? (
            <Loader />
          ) : (
            <Wrapper>
              <PictureWrapper>
                <BannerWrapper>
                  <Banner src={currentProfile.bannerSrc} />
                </BannerWrapper>
                <Avatar src={currentProfile.avatarSrc} />
              </PictureWrapper>
              <ProfileWrapper>
                <User>
                  <DisplayName>{currentProfile.displayName}</DisplayName>
                  <UserHandle>@{currentProfile.handle}</UserHandle>
                  <Bio>{currentProfile.bio}</Bio>
                  <DataWrapper>
                    <StyledFiLocation />
                    <Span>{currentProfile.location}</Span>
                    <StyledFiCalendar />
                    <Span>
                      Joined {moment(currentProfile.joined).format("MMMM YYYY")}
                    </Span>
                  </DataWrapper>
                  <FollowWrapper>
                    <Followers>
                      {currentProfile.numFollowing}{" "}
                      <FollowersSpan>Following</FollowersSpan>
                    </Followers>
                    <Followers>
                      {currentProfile.numFollowers}{" "}
                      <FollowersSpan>Followers</FollowersSpan>
                    </Followers>
                  </FollowWrapper>
                </User>
                <ButtonWrapper>
                  <Button aria-label="Tweets posted">Tweets</Button>
                  <Button aria-label="Media shared">Media</Button>
                  <Button aria-label="Tweets liked">Likes</Button>
                </ButtonWrapper>
              </ProfileWrapper>
              {currentTweets?.map((tweet) => {
                return (
                  <Tweet
                    tweet={tweet}
                    key={tweet.id}
                    tweetLiked={tweet.isLiked}
                    numLikes={tweet.numLikes}
                  />
                );
              })}
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  /* border-bottom: 1px solid rgb(230, 236, 240); */
  width: 613px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  border-left: 1px solid rgb(230, 236, 240);
  border-right: 1px solid rgb(230, 236, 240);
  border-top: 1px solid rgb(230, 236, 240);
`;

const PictureWrapper = styled.div``;

const BannerWrapper = styled.div`
  height: 200px;
`;

const Banner = styled.img`
  width: 100%;
  /* height: auto; */
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: solid 5px white;
  position: absolute;
  top: 100px;
  margin-left: 30px;
`;

const ProfileWrapper = styled.div``;

const User = styled.div`
  margin-right: 30px;
  padding: 20px;
`;

const DisplayName = styled.h1`
  font-size: 24px;
  margin-top: 100px;
`;

const UserHandle = styled.p`
  font-size: 20px;
  margin-top: 5px;
  color: rgb(101, 119, 134);
`;

const Bio = styled.p`
  font-size: 20px;
  margin-top: 30px;
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledFiLocation = styled(FiMapPin)`
  height: 20px;
  width: 20px;
  color: rgb(101, 119, 134);
`;

const StyledFiCalendar = styled(FiCalendar)`
  height: 20px;
  width: 20px;
  color: rgb(101, 119, 134);
`;

const Span = styled.span`
  font-weight: bold;
  color: rgb(101, 119, 134);
  margin-left: 5px;
  margin-right: 10px;
`;

const FollowWrapper = styled.div`
  margin-top: 20px;
`;

const Followers = styled.span`
  margin-left: 30px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const FollowersSpan = styled.span`
  color: rgb(101, 119, 134);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const Button = styled.button`
  width: 33%;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  /* text-align: center; */
  border-bottom: 3px solid transparent;

  &:hover {
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
  }
`;

export default Profile;
