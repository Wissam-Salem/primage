import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import Image from "../../components/Image/Image";

export default function Search() {
  let URL = process.env.REACT_APP_API;
  let { search } = useParams();
  let [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${URL}/search`,
        {
          search,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setImages(res.data.images);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="h-fit p-5">
        <h1 className="text-2xl">Results for: {search}</h1>
        <div className="flex justify-center flex-wrap gap-3 mt-10">
          {images.map((image) => {
            return (
              <Image
                image={image.url}
                user={image.user.username}
                pfp={image.user.pfp}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
