import React, { createContext, useState, useEffect } from "react";
import moment from "moment";

const date = new moment().format("h:mm A - MMM Do, YYYY");

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentUser(data.profile);
        setStatus("idle");
        // console.log(data);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
