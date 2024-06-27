import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Image from "../../components/Image/Image";
import axios from "axios";

export default function Home() {
  let URL = process.env.REACT_APP_API;
  let [images, setImages] = useState([]);

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

  useEffect(() => {
    axios
      .get(`${URL}/get-images`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.images);
        setImages(res.data.images);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="h-fit flex justify-center flex-wrap gap-3 pt-10 px-1">
        {images?.map((image) => {
          return (
            <Image
              image={image.url}
              user={image.user.username}
              pfp={image.user.pfp}
              key={image.url}
            />
          );
        })}
      </div>
    </div>
  );
}
