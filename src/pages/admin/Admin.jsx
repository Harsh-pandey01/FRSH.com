import React, { useEffect, useRef } from "react";
import { Link, Outlet, useParams } from "react-router";
import { useTheme } from "../../context/themeContext";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { SlBag } from "react-icons/sl";
import { RiProductHuntLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";

function Admin() {
  const { theme, setTheme } = useTheme();
  const { uid } = useParams();

  return (
    <div className="bg-primary h-screen w-full text-text">
      {/* dashboard Header */}

      <div className="flex z-10 items-center justify-between px-3 py-3 border-border border-b-1 bg-primary fixed w-full top-0 left-0">
        <Link
          to={"/"}
          className="font-extrabold font-syne text-xl sm:text-2xl md:text-4xl text-green"
          style={{
            WebkitTextStroke: "0.7px black",
            display: "inline-block",
          }}
        >
          FRSH
        </Link>
        <div>
          <div className="p-1.5 flex items-center cursor-pointer justify-center border border-border rounded-md">
            {theme == "dark" ? (
              <IoSunnyOutline onClick={() => setTheme("light")} />
            ) : (
              <IoMoonOutline onClick={() => setTheme("dark")} />
            )}
          </div>
        </div>
      </div>

      {/* main Section section */}

      <div className="w-full flex gap-2  md:pt-15 h-screen bg-secondry">
        {/* Left section */}
        <div className="absolute md:sticky  z-20 md:z-5 h-full  w-full md:w-60">
          <div className="bg-white/30 inset-0 absolute md:z-2"></div>
          <div className="w-60 flex flex-col px-2 py-2 h-full bg-primary z-5 border-border border-r-1  relative">
            <Link
              to={"/"}
              className="font-extrabold md:hidden font-syne text-4xl  text-green"
              style={{
                WebkitTextStroke: "0.7px black",
              }}
            >
              FRSH
            </Link>
            <div className="pt-5 h-full flex flex-col    md:pt-0">
              <div className="flex-1">
                <Link
                  to={`/admin/${uid}/dashboard`}
                  className="px-2 flex items-center gap-1 py-1.5 hover:bg-secondry cursor-pointer hover:border-border border-transparent transition-all ease-in-out duration-200 border-1 font-syne rounded-md"
                >
                  <MdOutlineDashboard />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to={`/admin/${uid}/orders`}
                  className="px-2 flex items-center gap-1 py-1.5 hover:bg-secondry cursor-pointer hover:border-border border-transparent transition-all ease-in-out duration-200 border-1 font-syne rounded-md"
                >
                  <SlBag />
                  <span>Orders</span>
                </Link>
                <Link
                  to={`/admin/${uid}/products`}
                  className="px-2 flex items-center gap-1 py-1.5 hover:bg-secondry cursor-pointer hover:border-border border-transparent transition-all ease-in-out duration-200 border-1 font-syne rounded-md"
                >
                  <RiProductHuntLine />
                  <span>Products</span>
                </Link>
              </div>
              <div className="px-2 py-1 cursor-pointer flex items-start  gap-2 hover:bg-secondry border-transparent border-1 hover:border-border transition-all ease-in-out duration-150 rounded-sm  group">
                <span className="hidden group-hover:block transition-all ease-in-out duration-150 text-text">
                  Settings
                </span>
                <CiSettings className="text-3xl group-hover:translate-x-2 duration-200 transition-all group-hover:rotate-40" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 flex-1 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
