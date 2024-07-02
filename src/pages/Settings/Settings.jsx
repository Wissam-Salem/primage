import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Profile from "../../components/SettingsSections/Profile/Profile";
import axios from "axios";
import Privacy from "../../components/SettingsSections/Privacy/Privacy";
import Collections from "../../components/SettingsSections/Collections/Collections";
import { AppContext } from "../../components/Context/Context";
import Posts from "../../components/SettingsSections/Posts/Posts";

export default function Settings() {
  let URL = process.env.REACT_APP_API;
  let { section, setSection } = useContext(AppContext);

  useEffect(() => {
    axios
      .get(`${URL}/authenticate`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.success);
        res.data.success === false && window.location.assign("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="grid gap-x-2 grid-cols-[25%_auto] max-lg:grid-cols-[31%_auto] max-md:grid-cols-1 h-[calc(100vh-130px)]">
        <div className="max-md:hidden">
          <ul className="flex flex-col gap-7 p-10 break-keep">
            <li
              className="w-fit"
              onClick={() => {
                setSection("profile");
              }}
            >
              <a href="#">Profile</a>
            </li>
            <li
              className="w-fit break-keep"
              onClick={() => {
                setSection("privacy");
              }}
            >
              <a href="#">Privacy and Security</a>
            </li>
            <li
              className="w-fit"
              onClick={() => {
                setSection("collections");
              }}
            >
              <a href="#">Manage collections</a>
            </li>
            <li
              className="w-fit"
              onClick={() => {
                setSection("posts");
              }}
            >
              <a href="#">Posts</a>
            </li>
          </ul>
        </div>
        {section === "privacy" ? (
          <Privacy />
        ) : section === "collections" ? (
          <Collections />
        ) : section === "posts" ? (
          <Posts />
        ) : (
          <Profile />
        )}
      </div>
    </div>
  );
}
