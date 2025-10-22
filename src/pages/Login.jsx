import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { loginWithEmail, signUpWithGoogle } from "../firebase/Auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Login() {
  const [loginCredential, setLoginCred] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginWithEmail(loginCredential);
    if (res) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="max-w-120 shadow-xl mt-10 mx-auto bg-secondry border border-border rounded-md">
      <div className="px-5 py-2.5 font-syne font-semibold text-left">
        LOGIN{" "}
        <span className="text-xs text-right text-text font-robo pl-1.5 font-light">
          welcome back our loyal customer .{" "}
        </span>
      </div>

      <div className="px-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label className="text-xs font-syne text-text" htmlFor="userEmail">
              Email
            </label>
            <input
              className="w-full text-sm mt-1 font-inter border border-border px-2 py-1.5 rounded-md outline-none focus:border-bluish"
              type="text"
              id="userEmail"
              name="userEmail"
              placeholder="abc@xyz.com"
              value={loginCredential?.email}
              onChange={(e) => {
                setLoginCred((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div>
            <label className="text-xs font-syne text-text" htmlFor="password">
              Password
            </label>
            <input
              className="w-full text-sm mt-1 border border-border px-2 py-1.5 rounded-md outline-none focus:border-bluish"
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder=". . . . . . . . . ."
              value={loginCredential?.password}
              onChange={(e) => {
                setLoginCred((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            className="font-syne px-5 py-1.25 shadow-xl my-5 cursor-pointer text-white bg-bluish rounded-sm"
          >
            LOGIN
          </button>
        </form>

        {/* <div className="mb-3 w-1/2 mx-aut bg-border"></div> */}

        <h1 className="text-center text-xs font-inter text-text">
          Don't have an account ?{" "}
          <span className="hover:underline pl-2 text-bluis font-bold font-syne text-bluish cursor-pointer">
            Signup Noww
          </span>
        </h1>
        <div className="w-full my-3">
          <div
            onClick={async () => {
              const res = await signUpWithGoogle();
              if (res) {
                navigate("/");
              }
            }}
            className="text-xs flex items-center gap-1 justify-center  font-semibold border-[1px] 
           rounded-md text-center  text-text font-syne py-1 cursor-pointer"
          >
            <img className="h-7" src="google.png" alt="" />
            <p>Login with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
