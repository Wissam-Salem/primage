import React, { useContext, useState } from "react";
import { Alert, Dropdown, message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../Context/Context";

export default function Privacy() {
  let URL = process.env.REACT_APP_API;
  let { setSection } = useContext(AppContext);
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [response, setResponse] = useState(null);
  let [messageApi, contextHolder] = message.useMessage();
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

  let success = () => {
    messageApi.open({
      type: "success",
      content: "Password has been changed",
    });
  };

  let error = () => {
    messageApi.open({
      type: "error",
      content: "Error! please try again",
    });
  };

  let handleChangePassword = () => {
    axios
      .post(
        `${URL}/reset-password`,
        {
          confirmPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.data.success && success();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleDeleteUser = () => {
    axios
      .get("http://192.168.0.106:5000/delete-user", {
        withCredentials: true,
      })
      .then((res) => {
        res.data.success && window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-md:pb-32 max-sm:pb-28 mt-4">
      {contextHolder}
      <div className="max-md:px-5">
        <div className="flex items-center justify-between ga">
          <h3 className="text-[#6B6B6B]">
            Settings {">"} Privacy and Security
          </h3>
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
      <div className="mt-3 w-[95%]">
        {response &&
          (response ? (
            <Alert
              type="success"
              message="Password has been changed"
              showIcon
            />
          ) : (
            <Alert type="error" message="Error! please try again" showIcon />
          ))}
      </div>
      <div className="flex flex-col max-md:items-center pt-5 max-md:pt-24 gap-7 top-8">
        <div className="flex flex-col w-[20rem]">
          <label htmlFor="newPassword">New password</label>
          <input
            className="py-3 px-4 border-2 border-black rounded-[10px]"
            type="text"
            id="newPassword"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="flex flex-col w-[20rem]">
          <label htmlFor="confirmPassword">Confirm new password</label>
          <input
            className="py-3 px-4 border-2 border-black rounded-[10px]"
            type="text"
            id="confirmPassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <button
            className="btn btn-success text-white mt-2"
            onClick={() => {
              handleChangePassword();
            }}
          >
            Change password
          </button>
        </div>
      </div>
      <div className="flex max-md:justify-center text-center relative top-16">
        <button
          className="btn bg-transparent ring-1 ring-red-700"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FontAwesomeIcon icon={faTrash} style={{ color: "#ea1a1a" }} />
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Account!</h3>
          <p className="py-4">
            By pressing confirm your account will be deleted
          </p>
          <div className="modal-action gap-1">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              className="btn"
              onClick={() => {
                handleDeleteUser();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
