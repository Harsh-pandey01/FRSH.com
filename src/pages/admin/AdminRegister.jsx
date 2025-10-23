import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signupUser, signUpWithGoogle } from "../../firebase/Auth";
import userUserInfo from "../../hooks/useUserInfo";
import { userLoggedIn } from "../../store/AuthSlice";
import { FaEyeSlash } from "react-icons/fa";
import { div } from "motion/react-client";
import { setDataToDatabase } from "../../firebase/db";

function AdminRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customAuthConfig = {
    userEmail: [
      {
        isRequired: true,
        errorMsg: "Enter an email",
      },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
        errorMsg: "Enter a valid email",
      },
    ],
    password: [
      {
        isRequired: true,
        errorMsg: "Create a password",
      },
      {
        minLength: 8,
        errorMsg: "Password should be of atleast 8 digits",
      },
      {
        character: ["-", "$", "_"],
        errorMsg: "Password should have atleast one character, - , $ , _",
      },
    ],
  };

  const [userData, setUserData] = useState({
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsgData, setErrorMsgData] = useState({});

  const handleSignupFormValidation = () => {
    let isFormValid = true;

    for (let key in customAuthConfig) {
      const validation = customAuthConfig[key];
      const value = userData[key];

      validation.some((rule) => {
        // Pattern check (used in userEmail)

        if (rule.isRequired) {
          if (!userData[key]) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }

        if (rule?.pattern) {
          const isValid = rule.pattern.test(value);
          if (!isValid) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true; // stop on first failure
          }
        }

        // Min length check (used in password)
        if (rule?.minLength) {
          if (!value || value.length < rule.minLength) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }

        // Character inclusion check (used in password)
        if (rule?.character) {
          const hasSpecialChar = rule.character.some((char) =>
            value.includes(char)
          );
          if (!hasSpecialChar) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }

        // EndsWith check (if you add it to email later)
        if (rule?.endsWith) {
          if (!value.endsWith(rule.endsWith)) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }
      });
    }

    // Confirm password match
    if (userData.password !== userData.confirmPassword) {
      setErrorMsgData((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      isFormValid = false;
    }

    return isFormValid;
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (Object.keys(errorMsgData).length) {
      setErrorMsgData((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const [handleToggleEyeForConfirmPassword, setEye] = useState(false);

  const handleSignUp = async () => {
    let isValid = handleSignupFormValidation();
    if (isValid) {
      const res = await signupUser(userData);

      if (res) {
        const data = userUserInfo(res);
        // extract userInformation and create the user Data
        const result = setDataToDatabase(data.uid, "admin");

        dispatch(userLoggedIn({ userInfo: { ...data, role: "admin" } }));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  return (
    <div
      className="h-screen pt-10"
      style={{
        backgroundImage: "url(/color-bg.jpg)",
      }}
    >
      <div className="max-w-120 shadow-xl  mx-auto bg-secondry border border-border rounded-md">
        <div className="px-5 py-2.5 font-syne font-semibold text-right">
          Register{" "}
          <span className="text-xs text-bluish pl-1.5">as an Admin </span>
        </div>

        <div className="px-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="relative">
              <label
                className="text-xs font-syne text-text"
                htmlFor="userEmail"
              >
                Email
              </label>
              <input
                className="w-full text-sm mt-1 font-inter border border-border px-2 py-1.5 rounded-md outline-none focus:border-bluish"
                type="text"
                id="userEmail"
                name="userEmail"
                placeholder="abc@xyz.com"
                autoComplete="on"
                value={userData.userEmail}
                onChange={handleChange}
              />
              <p className="text-xs text-red-500 font-inter relative ">
                {errorMsgData?.userEmail}
              </p>
            </div>
            <div className="relative">
              <label className="text-xs font-syne text-text" htmlFor="password">
                Password
              </label>
              <input
                autoComplete="off"
                className="w-full text-sm mt-1 border border-border px-2 py-1.5 rounded-md outline-none focus:border-bluish"
                type="text"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder=". . . . . . . . . ."
              />
              <p className="text-xs text-red-500 font-inter relative ">
                {errorMsgData?.password}
              </p>
            </div>
            <div className="relative">
              <label
                className="text-xs font-syne text-text"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>

              <div className="mt-1">
                <div className="group w-full flex items-center px-2 gap-2 font-inter text-sm border border-border rounded-md transition-colors focus-within:border-bluish">
                  <input
                    className="flex-1 font-inter text-sm py-1.5 rounded-md outline-none bg-transparent"
                    type={
                      !handleToggleEyeForConfirmPassword ? "password" : "text"
                    }
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter password again"
                  />
                  <button className="text-text">
                    <FaEyeSlash
                      onClick={() => {
                        setEye((prev) => !prev);
                      }}
                    />
                  </button>
                </div>
              </div>
              <p className="text-xs text-red-500 font-robo font-light relative ">
                {errorMsgData?.confirmPassword}
              </p>
            </div>

            <button
              onClick={handleSignUp}
              className="font-syne px-5 py-1.25 shadow-xl my-5 cursor-pointer text-white bg-bluish rounded-sm"
            >
              Register
            </button>
          </form>

          <h1 className="text-center text-xs font-inter text-text">
            Already have an account ?{" "}
            <Link
              to={"/admin/login"}
              className="hover:underline pl-2 text-bluis font-bold font-syne text-bluish cursor-pointer"
            >
              Login Noww
            </Link>
          </h1>
          <div
            className="w-full my-3"
            onClick={async () => {
              const res = await signUpWithGoogle();
              if (res) {
                // extract userInformation and create the user Data
                const data = userUserInfo(res);

                const result = setDataToDatabase(data.uid, "admin");

                dispatch(
                  userLoggedIn({ userInfo: { ...data, role: "admin" } })
                );
                navigate("/");
              }
            }}
          >
            <div className="text-xs flex items-center gap-1 justify-center  font-semibold border-[1px] rounded-md text-center  text-text font-syne py-1 cursor-pointer">
              <img className="h-7" src="google.png" alt="" />
              <p>Signup with Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
