import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import random from "random-string-generator";
import axios from "axios";

export default function FavorateImage({ image }) {
  let URL = process.env.REACT_APP_API;
  let modalImage = useRef(null);
  let randomName = random();
  let handleremoveFavorate = () => {
    axios
      .post(`${URL}/remove-from-favorate`, {
        image,
      })
      .then((res) => {
        console.log(res.data.success);
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
      </div>
      <dialog ref={modalImage} id="my_modal_5" className="modal">
        <div className="modal-box flex justify-between w-fit bg-transparent shadow-none cursor-default">
          <div className="relative w-72 max-md:w-56">
            <div className="w-fit fit">
              <img className="rounded-md" src={image} alt="" />
            </div>
            <div className="w-full h-10 flex justify-between items-center px-4 absolute top-3">
              <button>
                <FontAwesomeIcon icon={faTrash} color="red" size="xl" />
              </button>
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
