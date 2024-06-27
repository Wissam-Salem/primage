import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Alert } from "antd";
import axios from "axios";

export default function GetStarted() {
  let URL = process.env.REACT_APP_API;
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [success, setSuccess] = useState(null);
  let [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(`${URL}/authenticate`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.success);
        res.data.success === true && window.location.assign("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleRegister = () => {
    axios
      .post(
        `${URL}/register`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSuccess(res.data.success);
        setMessage(res.data.message);
        res.data.success && window.location.assign("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleLogin = () => {
    axios
      .post(
        `${URL}/login`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSuccess(res.data.success);
        setMessage(res.data.message);
        res.data.success && window.location.assign("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="max-md:h-[calc(100vh-200px)] h-[calc(100vh-250px)] flex flex-col justify-center items-center gap-12">
        <div className="text-center w-full">
          <h1 className="text-[50px] max-md:text-[40px] mb-2">
            <span className="bg-gradient-to-r text-transparent bg-clip-text font-bold from-violet-800 via-orange-500 to-red-600">
              P
            </span>
            rimage Your Imagination
          </h1>
          <p className="text-[28px] max-md:text-[19px] px-2">
            Get started now and let yourself dive through your imagination{" "}
          </p>
        </div>
        <div className="text-white flex max-md:flex-col justify-center gap-10 max-md:gap-5">
          <button
            className="btn px-3 py-2 rounded-[10px] hover:bg-slate-400 bg-[#3E2A35] text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Get Started
          </button>
          <button
            className="btn px-3 py-2 rounded-[10px] hover:bg-slate-400 hover:text-white bg-[#E6ADEC] text-black"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Sign In
          </button>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-[75%] flex flex-col justify-center gap-10 p-10 text-center overflow-hidden">
          <h1 className="max-md:text-2xl text-3xl">Create Account</h1>
          <div className="flex flex-col items-center text-start gap-3">
            <div className="flex gap-4 relative -top-3">
              <a href="#">
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  width={39}
                  alt="google"
                />
              </a>
              <a href="#">
                <img
                  src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                  width={40}
                  alt="facebook"
                />
              </a>
              <a href="#">
                <img
                  src="https://img.icons8.com/?size=100&id=13963&format=png&color=000000"
                  width={40}
                  alt="twitter"
                />
              </a>
            </div>
            {success !== null &&
              (success === true ? (
                <Alert message={message} type="success" showIcon />
              ) : (
                <Alert message={message} type="error" showIcon />
              ))}
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="py-3 px-4 border-2 border-black rounded-[10px]"
                type="text"
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="py-3 px-4 border-2 border-black rounded-[10px]"
                type="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="py-3 px-4 border-2 border-black rounded-[10px]"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                required
              />
            </div>
            <div className="flex flex-col">
              <button
                className="relative top-2 btn bg-[#6A01AA] hover:text-black text-white px-14"
                onClick={() => {
                  handleRegister();
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box h-[65%] flex flex-col justify-center gap-10 p-10 text-center">
          <h1 className="max-md:text-2xl text-3xl">Sign In</h1>
          <div className="flex flex-col items-center text-start gap-3">
            <div className="flex gap-4 relative -top-3">
              <a href="#">
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  width={39}
                  alt="google"
                />
              </a>
              <a href="#">
                <img
                  src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                  width={40}
                  alt="facebook"
                />
              </a>
              <a href="#">
                <img
                  src="https://img.icons8.com/?size=100&id=13963&format=png&color=000000"
                  width={40}
                  alt="twitter"
                />
              </a>
            </div>
            {success !== null &&
              (success === true ? (
                <Alert message={message} type="success" showIcon />
              ) : (
                <Alert message={message} type="error" showIcon />
              ))}
            <div className="flex flex-col">
              <label htmlFor="username2">Username</label>
              <input
                className="py-3 px-4 border-2 border-black rounded-[10px]"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="username2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password2">Password</label>
              <input
                className="py-3 px-4 border-2 border-black rounded-[10px]"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password2"
              />
            </div>
            <div className="flex flex-col">
              <button
                className="relative top-3 btn bg-[#6A01AA] hover:text-black text-white px-14"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
