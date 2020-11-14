import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Tweet from "./Tweet/Tweet";
import TweetInput from "./TweetInput";
import { CurrentUserContext } from "./CurrentUserContext";

const HomeFeed = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  const [homeFeed, setHomeFeed] = useState([]);
  const [newTweet, setNewTweet] = useState(0);

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const feedArray = Object.values(data.tweetsById);
        const sortedFeed = feedArray.sort((a, b) =>
          a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
        );
        setHomeFeed(sortedFeed);
        // console.log("feed array", feedArray.timestamp);
        // console.log({ sortedfeedfromhomefeed: sortedFeed });
      });
  }, [newTweet]);
  // console.log(homeFeed);
  return (
    <>
      <Wrapper>
        <TweetInput
          user={currentUser}
          newTweet={newTweet}
          setNewTweet={setNewTweet}
        />
        {homeFeed.map((tweet) => {
          return (
            <Tweet tweet={tweet} key={tweet.id} numLikes={tweet.numLikes} />
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 60%;
`;

//map through tweetIds and then if they're equal to tweetsbyid.id return

export default HomeFeed;
