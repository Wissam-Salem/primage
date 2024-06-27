import "./Notifications.css";
import { Dropdown } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/Context";
import axios from "axios";

export default function Notifications() {
  let URL = process.env.REACT_APP_API;
  let { notifications, setSection } = useContext(AppContext);
  let [one, setOne] = useState(false);
  let [two, setTwo] = useState(false);
  let [three, setThree] = useState(false);
  console.log(three);
  let items = [
    {
      key: "1",
      label: (
        <button
          className="w-full"
          onClick={() => {
            setSection("profile");
          }}
        >
          Profile
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="w-full"
          onClick={() => {
            setSection("privacy");
          }}
        >
          Privacy
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="w-full"
          onClick={() => {
            setSection("collections");
          }}
        >
          Collections
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          className="w-full"
          onClick={() => {
            setSection("notifications");
          }}
        >
          Notifications
        </button>
      ),
    },
  ];

  let handleUpdateNotifications = () => {
    axios
      .post(
        `${URL}/edit-notifications`,
        {
          one,
          two,
          three,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-md:pb-32 max-sm:pb-28 mt-4">
      <div className="max-md:px-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[#6B6B6B]">Settings {">"} Notifications</h3>
          <Dropdown
            className="hidden max-md:block ring-0 outline-0"
            menu={{
              items,
            }}
            placement="bottomRight"
          >
            <button className="ring-0 outline-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col gap-12 mt-8 max-md:px-5">
        <div className="flex gap-4">
          <label class="switch">
            <input
              checked={notifications?.one}
              type="checkbox"
              class="input__check"
              onChange={(e) => {
                setOne(e.target.checked)
                handleUpdateNotifications();
              }}
            />
            <span class="slider"></span>
          </label>
          <p>Send a notification when someone follow me</p>
        </div>
        <div className="flex gap-4">
          <label class="switch">
            <input
              checked={notifications?.two}
              type="checkbox"
              class="input__check"
              onChange={(e) => {
                setTwo(e.target.checked);
              }}
            />
            <span class="slider"></span>
          </label>
          <p>Send a notification when someone I follow post an image</p>
        </div>
        <div className="flex gap-4">
          <label class="switch">
            <input
              checked={notifications?.three}
              type="checkbox"
              class="input__check"
              onChange={(e) => {
                setThree(e.target.checked);
              }}
            />
            <span class="slider"></span>
          </label>
          <p>Reminds me every 7 days to check what’s new</p>
        </div>
      </div>
    </div>
  );
}
