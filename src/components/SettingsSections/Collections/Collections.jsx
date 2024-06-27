import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FavorateImage from "../../FavorateImage/FavorateImage";
import { Dropdown } from "antd";
import { AppContext } from "../../Context/Context";

export default function Collections() {
  let { setSection } = useContext(AppContext);
  let [favorate, setFavorate] = useState([
    "https://i.pinimg.com/564x/6d/f0/9f/6df09f4164d00f09f3186d8bde69c288.jpg",
    "https://i.pinimg.com/564x/ab/bb/ef/abbbef3d1304ecea1535af565562823f.jpg",
    "https://i.pinimg.com/564x/07/12/28/0712286f3de78b8a8957aed7745e2812.jpg",
    "https://i.pinimg.com/564x/6d/f0/9f/6df09f4164d00f09f3186d8bde69c288.jpg",
    "https://i.pinimg.com/564x/6d/f0/9f/6df09f4164d00f09f3186d8bde69c288.jpg",
    "https://i.pinimg.com/564x/6d/f0/9f/6df09f4164d00f09f3186d8bde69c288.jpg",
  ]);
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
  
  // useEffect(() => {
  //   axios
  //     .get("http://192.168.0.106:5000/get-favorate-images", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data.favorates);
  //       setFavorate(res.data.favorates);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="max-md:pb-32 max-sm:pb-28 mt-4">
      <div className="max-md:px-5 flex justify-between items-center">
        <h3 className="text-[#6B6B6B]">Settings {">"} Manage Collections</h3>
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
      <div className="flex justify-center gap-3 flex-wrap pt-10">
        {favorate.map((image) => {
          return <FavorateImage image={image} />;
        })}
      </div>
    </div>
  );
}
