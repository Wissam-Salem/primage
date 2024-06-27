import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import random from "random-string-generator";
import axios from "axios";
import "./Image.css";

export default function Image({ image, user, pfp }) {
  let URL = process.env.REACT_APP_API;
  let modalImage = useRef(null);
  let randomName = random();
  let handleFavorates = () => {
    axios
      .post(
        `${URL}/add-to-favorate`,
        {
          image,
        },
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
    <>
      <div>
        <a
          href="#"
          className="bg-red-400 w-fit h-fit rounded-[25px]"
          onClick={() => modalImage.current.showModal()}
        >
          <img
            className="w-52 h-52 max-md:w-40 max-md:h-40 object-cover rounded-[25px]"
            src={image}
            alt="pic"
          />
        </a>
        <div className="flex items-center gap-2 text-[.9rem] my-1">
          <a href="#">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={
                pfp ||
                "https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"
              }
              alt=""
            />
          </a>
          <h1>{user}</h1>
        </div>
      </div>
      <dialog ref={modalImage} id="my_modal_5" className="modal">
        <div className="modal-box flex justify-between w-fit bg-transparent shadow-none cursor-default">
          <div className="relative w-72 max-md:w-56">
            <div className="w-fit fit">
              <img className="rounded-md" src={image} alt="" />
            </div>
            <div className="w-full h-10 flex justify-between items-center px-4 absolute top-3">
              <div
                onClick={() => {
                  handleFavorates();
                }}
                className="con-like"
              >
                <input className="like" type="checkbox" title="like" />
                <div className="checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="outline"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="filled"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100"
                    width="100"
                    className="celebrate"
                  >
                    <polygon className="poly" points="10,10 20,20"></polygon>
                    <polygon className="poly" points="10,50 20,50"></polygon>
                    <polygon className="poly" points="20,80 30,70"></polygon>
                    <polygon className="poly" points="90,10 80,20"></polygon>
                    <polygon className="poly" points="90,50 80,50"></polygon>
                    <polygon className="poly" points="80,80 70,70"></polygon>
                  </svg>
                </div>
              </div>
              <a href={image} download={randomName + ".png"}>
                <FontAwesomeIcon icon={faDownload} size="xl" color="white" />
              </a>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
