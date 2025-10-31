import React, { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "../context/themeContext";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { logOut } from "../firebase/Auth";

function Header() {
  const { theme, setTheme } = useTheme();
  const { userInfo } = useSelector((state) => state.authState);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div className="w-full z-50 sticky top-0 left-0 bg-primary shadow px-5 py-4 flex items-center justify-between border-b border-border ">
        <div className="flex items-center md:gap-10 lg:gap-50">
          <Link
            to={"/"}
            className="font-extrabold font-syne text-4xl text-green"
            style={{
              WebkitTextStroke: "0.7px black",
              display: "inline-block",
            }}
          >
            FRSH
          </Link>

          <nav className="hidden md:flex text-xs lg:text-sm gap-5 items-center lg:gap-10 font-syne ">
            <p
              className={`cursor-pointer ${
                theme == "dark" ? "hover:text-green" : ""
              } transition-all duration-150 ease-in `}
            >
              MENS WEAR
            </p>
            <p
              className={`cursor-pointer ${
                theme == "dark" ? "hover:text-green" : ""
              } transition-all duration-150 ease-in `}
            >
              WOMENS WEAR
            </p>
            <Link
              to={"collection"}
              className={`cursor-pointer ${
                theme == "dark" ? "hover:text-green" : ""
              } transition-all duration-150 ease-in `}
            >
              COLLECTIONS
            </Link>
          </nav>
        </div>
        <div>
          <div className="font-inter flex items-center gap-5">
            <div className="flex items-center gap-5">
              <Link to={"/cart"}>
                <CiShoppingCart className="text-2xl cursor-pointer" />
              </Link>
              <CiHeart className="text-2xl cursor-pointer" />
              {!userInfo && (
                <div className="flex  items-center gap-5">
                  <Link
                    to={"adminPanel"}
                    className="bg-bluish text-white text-sm font-syne px-2 py-1 rounded-md cursor-pointer"
                  >
                    ADMIN
                  </Link>
                  <Link
                    to={"/login"}
                    className="text-text font-syne text-sm border-[1px] border-bluish px-3 py-1 cursor-pointer rounded-md"
                  >
                    LOGIN
                  </Link>
                  <Link
                    to={"/signup"}
                    className="font-syne text-sm cursor-pointer"
                  >
                    SIGN UP
                  </Link>
                </div>
              )}
            </div>

            {userInfo && (
              <>
                <div className="h-10 relative cursor-pointer w-10 rounded-full   shadow-2xl">
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileOpen((prev) => !prev);
                    }}
                    className="h-full w-full object-cover rounded-full"
                    src={userInfo.photoURL || "default_profile.jpg"}
                    alt="profile-image"
                  />
                  {isProfileOpen && (
                    <div className="absolute bg-primary min-w-70 flex flex-col  transition-all top-14 border border-border p-2 animate-slideIn  rounded-md">
                      <h1 className="text-sm font-inter p-2 rounded-md hover:bg-secondry">
                        {userInfo.email}
                      </h1>
                      <Link
                        to={"/adminPanel"}
                        className="p-2 text-sm font-inter border border-transparent hover:border-1 hover:border-border rounded-md hover:bg-secondry transition-all"
                      >
                        Admin Panel
                      </Link>
                      <div
                        onClick={() => {
                          logOut();
                        }}
                        className="text-sm p-2 font-inter border border-transparent hover:border-1 hover:border-border rounded-md hover:bg-secondry"
                      >
                        <p className="flex items-center gap-1">
                          <IoIosLogOut className="text-xl" />
                          <span className="text-red-600 ">Log Out</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="p-1.5 flex items-center cursor-pointer justify-center border border-border rounded-md">
              {theme == "dark" ? (
                <IoSunnyOutline onClick={() => setTheme("light")} />
              ) : (
                <IoMoonOutline onClick={() => setTheme("dark")} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* categories in the phones */}
      <div className="md:hidden bg-secondry  border-border border-b-[1px] w-full flex  text-sm gap-5 items-center justify-center py-5 font-syne ">
        <p
          className={`cursor-pointer ${
            theme == "dark" ? "hover:text-green" : ""
          } transition-all duration-150 ease-in `}
        >
          MENS WEAR
        </p>
        <p
          className={`cursor-pointer ${
            theme == "dark" ? "hover:text-green" : ""
          } transition-all duration-150 ease-in `}
        >
          WOMENS WEAR
        </p>
        <p
          className={`cursor-pointer ${
            theme == "dark" ? "hover:text-green" : ""
          } transition-all duration-150 ease-in `}
        >
          COLLECTIONS
        </p>
      </div>
    </>
  );
}

export default Header;
