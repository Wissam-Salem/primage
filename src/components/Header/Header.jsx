import { useEffect, useState } from "react";
import LogedHeader from "../LogedHeader/LogedHeader";
import axios from "axios";

export default function Header() {
  let URL = process.env.REACT_APP_API;
  let [success, setSuccess] = useState(false);
  useEffect(() => {
    axios
      .get(`${URL}/authenticate`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.success);
        setSuccess(res.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-3 flex items-center">
      <div className="w-16 ml-5 max-md:w-12">
        <a href="/home">
          <img className="w-20" src="../assets/logo.png" alt="logo" />
        </a>
      </div>
      {success && <LogedHeader />}
    </div>
  );
}
