import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../Context/Context";
import { Dropdown } from "antd";

export default function Profile() {
  let URL = process.env.REACT_APP_API;
  let { username, pfp, bio, setSection } = useContext(AppContext);
  let [fileName, setFileName] = useState("");
  let [newUsername, setNewUsername] = useState(null);
  let [newBio, setNewBio] = useState(null);
  let [newPfp, setNewPfp] = useState(null);
  let usernameInput = useRef(null);
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

  let enableUsernameInput = () => {
    usernameInput.current.disabled = false;
  };
  let convertToBase64 = async (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    let data = new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
    return data;
  };

  let handleConvertion = async (e) => {
    let file = e.target.files[0];
    let image = await convertToBase64(file);
    setNewPfp(image);
    console.log(image);
  };

  let updateProfile = () => {
    if (newUsername) {
      axios
        .post(
          `${URL}/change-username`,
          {
            newUsername,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);
        });
    }

    if (newPfp) {
      axios
        .post(
          `${URL}/change-pfp`,
          {
            newPfp,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);
        });
    }

    if (newBio) {
      axios
        .post(
          `${URL}/edit-bio`,
          {
            newBio,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);
        });
    }
  };

  return (
    <div className="max-md:pb-32 max-sm:pb-28 mt-4">
      <div className="max-md:px-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[#6B6B6B]">Settings {">"} Profile</h3>
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
      <div className="flex items-center max-md:flex-col gap-8 max-md:gap-6 max-md:w-full mt-5">
        <div className="relative text-center flex flex-col items-center">
          <div className="rounded-full">
            <img
              className="w-[140px] h-[140px] object-cover rounded-full"
              src={
                pfp ||
                "https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"
              }
              alt="pfp"
            />
          </div>
          <p className="relative w-32 whitespace-nowrap overflow-hidden text-ellipsis top-2">
            {fileName}
          </p>
        </div>
        <label className="btn rounded-[20px] px-8 bg-[#D9D9D9]" htmlFor="pfp">
          Edit
        </label>
        <input
          className="hidden"
          onChange={(e) => {
            handleConvertion(e);
            setFileName(e.target.files[0].name);
          }}
          type="file"
          id="pfp"
        />
      </div>
      <div className=" flex flex-col gap-5 mt-7">
        <div className="flex items-end max-md:justify-center max-md:px-5 gap-5">
          <div>
            <p className="text-black">Username</p>
            <input
              className="w-56 rounded-[15px] py-2 px-4 border-2 border-black"
              type="text"
              defaultValue={username}
              ref={usernameInput}
              disabled={true}
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
              id="username"
            />
          </div>
          <label
            className="btn rounded-[20px] py-2 px-8 bg-[#D9D9D9]"
            htmlFor="username"
            onClick={() => {
              enableUsernameInput();
            }}
          >
            Change
          </label>
        </div>
        <div className="relative flex flex-col max-md:justify-center max-md:items-center max-md:px-5 gap-3">
          <div>
            <p className="text-black">Bio</p>
            <textarea
              className="w-[360px] h-[150px] flex flex-col rounded-[15px] px-4 py-2 border-2 border-black"
              type="text"
              defaultValue={bio}
              placeholder="Tell us about yourself"
              onChange={(e) => {
                setNewBio(e.target.value);
              }}
              id="username"
            />
          </div>
          <div>
            <button
              className="btn btn-success text-white"
              onClick={() => {
                updateProfile();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
