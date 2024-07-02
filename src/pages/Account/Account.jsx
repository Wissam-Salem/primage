import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import AccountImage from "../../components/AccountImage/AccountImage";
import { message } from "antd";

export default function Account() {
  let { account } = useParams();
  let URL = process.env.REACT_APP_API;
  let [pfp, setPfp] = useState("");
  let [bio, setBio] = useState("");
  let [isFolllowing, setIsFollowing] = useState(false);
  let [images, setImages] = useState([]);
  let [followings, setFollowings] = useState([]);
  let [messageApi, contextHolder] = message.useMessage();
  let success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  let error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  useEffect(() => {
    axios
      .get(`${URL}/authenticate`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.success);
        console.log(res.data.sendUser.followings);
        res.data.sendUser.followings.includes(account)
          ? setIsFollowing(true)
          : setIsFollowing(false);
        setFollowings(res.data.sendUser.followings);
        res.data.success === false && window.location.assign("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        `${URL}/creator-info`,
        {
          account,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setPfp(res.data.user?.pfp);
        setBio(res.data.user?.bio);
        setImages(res.data?.images);
        console.log(res.data);
      });
  }, []);

  let handleFollow = () => {
    axios
      .post(
        `${URL}/${isFolllowing ? "unfollow" : "follow"}`,
        {
          account,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.data.success && success(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        error("Error! please try again");
        console.log(err);
      });
  };

  return (
    <div>
      {contextHolder}
      <Header />
      <div className="h-fit grid grid-cols-2 max-md:grid-cols-1 max-md:gap-y-5 p-10 max-md:py-16">
        <div className="flex flex-col justify-evenly items-center">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-3">
              <img
                className="w-32 h-32 max-md:w-24 max-md:h-24 object-cover rounded-full"
                src={
                  pfp ||
                  "https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"
                }
                alt="pfp"
              />
              <h2 className="text-xl">{account}</h2>
              <button
                onClick={() => {
                  handleFollow();
                  setIsFollowing(!isFolllowing);
                }}
                className="btn btn-secondary"
              >
                {isFolllowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
          <div className="w-[90%] rounded-md h-52 my-5 mb-3 p-3 bg-gray-300">
            {bio}
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-3">
          {images?.map((image) => {
            return <AccountImage image={image.url} key={image.url} />;
          })}
        </div>
      </div>
    </div>
  );
}
