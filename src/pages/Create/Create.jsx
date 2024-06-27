import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";

export default function Create() {
  let URL = process.env.REACT_APP_API;
  let [url, setUrl] = useState(null);
  let [tags, setTags] = useState(null);
  let [fileName, setFileName] = useState("");

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
    setUrl(image);
    console.log(image);
  };

  let handlePost = () => {
    axios
      .post(
        `${URL}/add-image`,
        { url, tags },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-300px)] max-md:h-[calc(100vh-250px)] flex max-md:flex-col justify-center items-center gap-32 max-md:gap-10">
        <div className="text-center">
          <label
            className="flex flex-col justify-center items-center gap-3 w-[333px] h-[274px] rounded-[30px] cursor-pointer bg-[#D9D9D9]"
            htmlFor="post"
          >
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </p>
            <p>Choose an image from here</p>
          </label>
          <p className="mt-2">{fileName}</p>
        </div>
        <div className="flex flex-col items-center gap-5 mt-14 max-md:mt-0">
          <input
            className="border-2 border-black rounded-[10px] w-[17rem] p-3 "
            type="text"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            placeholder="Type your tags"
          />
          <button
            className="btn w-44 shadow-md bg-gradient-to-r from-rose-600 via-orange-400 to-violet-700 text-white"
            onClick={() => {
              handlePost();
            }}
          >
            Post
          </button>
        </div>
      </div>
      <input
        className="hidden"
        onChange={(e) => {
          handleConvertion(e);
          setFileName(e.target.files[0].name);
        }}
        type="file"
        id="post"
      />
    </div>
  );
}
