import React, { useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import random from "random-string-generator";
import { message } from "antd";

export default function PostImage({ post }) {
  let URL = process.env.REACT_APP_API;
  let modalImage = useRef(null);
  let randomName = random();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  let handleRemovePosts = () => {
    axios
      .post(
        `${URL}/delete-post`,
        {
          post,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        res.data.success && success(res.data.message);
        console.log(res.data);
      })
      .catch((error) => {
        error("Error! please try again");
        console.log(error);
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
            src={post}
            alt="pic"
          />
        </a>
      </div>
      <dialog ref={modalImage} id="my_modal_5" className="modal">
        <div className="modal-box flex justify-between w-fit bg-transparent shadow-none cursor-default">
          <div className="relative w-72 max-md:w-56">
            <div className="w-fit fit">
              <img className="rounded-md" src={post} alt="" />
            </div>
            <div className="w-full h-10 flex justify-between items-center px-4 absolute top-3">
              <button
                onClick={() => {
                  handleRemovePosts();
                }}
              >
                <FontAwesomeIcon icon={faTrash} color="red" size="xl" />
              </button>
              <a href={post} download={randomName + ".png"}>
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
