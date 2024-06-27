import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import App from "../../App";

export let AppContext = createContext(null);
export default function Context() {
  let URL = process.env.REACT_APP_API;
  let [username, setUsername] = useState("");
  let [pfp, setPfp] = useState("");
  let [bio, setBio] = useState("");
  let [section, setSection] = useState("");
  let [notifications, setNotifications] = useState({
    one: false,
    two: false,
    three: false,
  });

  useEffect(() => {
    axios
      .get(`${URL}/authenticate`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUsername(res.data?.sendUser?.username);
        setPfp(res.data?.sendUser?.pfp);
        setBio(res.data?.sendUser?.bio);
        setNotifications(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{ username, pfp, bio, section, notifications, setSection }}
    >
      <App />
    </AppContext.Provider>
  );
}
