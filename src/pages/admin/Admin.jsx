import React from "react";
import { Link, Outlet } from "react-router";

function Admin() {
  return (
    <div
      className="h-screen w-full text-text bg-primary flex items-center justify-center "
      style={{
        backgroundImage: "url(color-bg.jpg)",
      }}
    >
      <div className="flex items-center gap-10">
        <Link
          to={"login"}
          className="text-xl bg-green px-15 font-syne text-black  py-10  shadow-xl cursor-pointer rounded-xl hover:translate-y-2 transition-all"
        >
          Already an admin ??
        </Link>
        <Link
          to={"register"}
          className="text-xl font-syne px-15 text-black py-10 bg-bluish shadow-xl cursor-pointer rounded-xl hover:translate-y-2 transition-all"
        >
          Become our new Member .
        </Link>
      </div>
    </div>
  );
}

export default Admin;
