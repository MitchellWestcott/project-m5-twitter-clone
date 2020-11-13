import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";

const AppNav = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route exact path="/home">
          <HomeFeed />
        </Route>
        <Route exact path="/notifications">
          <Notifications />
        </Route>
        <Route exact path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route exact path="/tweet/:tweetId">
          <TweetDetails />
        </Route>
        <Route exact path="/:profileId">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppNav;
