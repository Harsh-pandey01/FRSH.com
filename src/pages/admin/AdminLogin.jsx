import React, { useState } from "react";
import { loginWithEmail } from "../../firebase/Auth";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { getUserInfoFromDatabase } from "../../firebase/db";

function AdminLogin() {
  // setDataToDatabase();
  const [isAdmin, setAdmin] = useState(false);
  const [adminCred, setCred] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleAdminLogin = async () => {
    const res = await loginWithEmail(adminCred);
    if (res) {
      const { role } = await getUserInfoFromDatabase(res?.user.uid);

      if (role != "admin") {
        toast.error("Current Account is not an Admin Account");
        setAdmin(true);
      } else {
        navigate(`/admin/${res?.user?.uid}/dashboard`);
      }
    }
  };
  return (
    <>
      <div
        className="h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: "url(/color-bg-login.jpg)",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="max-w-120 w-120 bg-white p-2 border border-border shadow-2xl rounded-sm">
          <h1 className="text-xs text-right font-semibold text-bluish font-robo">
            Login to your Admin Account
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label htmlFor="adminEmail" className="text-xs font-inter">
                Email
              </label>
              <input
                className="w-full text-text px-2 py-1.5 mt-1 bg-secondry border border-border outline-none rounded-sm font-inter text-sm"
                placeholder="Enter your admin email"
                type="email"
                value={adminCred?.email}
                onChange={(e) => {
                  setCred((prev) => ({ ...prev, email: e.target.value }));
                }}
                id="adminEmail"
              />
            </div>
            <div>
              <label htmlFor="adminPassword" className="text-xs font-inter">
                Password
              </label>
              <input
                className="w-full text-text px-2 py-1.5 mt-1 bg-secondry border border-border outline-none rounded-sm font-inter text-sm"
                placeholder="Password"
                type="password"
                value={adminCred?.password}
                onChange={(e) => {
                  setCred((prev) => ({ ...prev, password: e.target.value }));
                }}
                id="adminPassword"
              />
            </div>
            <div>
              <button
                onClick={handleAdminLogin}
                className="px-4 py-1.5 bg-bluish mt-4 text-white text-sm font-inter rounded-md shadow-sm cursor-pointer"
              >
                Login Dear Admin
              </button>
            </div>
          </form>

          <div className="text-center mt-3 text-sm  font-inter">
            Dont have an admin Account ?{" "}
            <Link
              to={"/admin/register"}
              className="text-bluish text-xs underline cursor-pointer"
            >
              Register Now
            </Link>
          </div>

          {isAdmin && (
            <div className="my-1">
              <h1 className="text-sm text-center font-inter">
                Convert Into Admin Account -{" "}
                <span className="text-sm font-syne ml-1 underline text-bluish cursor-pointer">
                  Click here
                </span>
              </h1>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default AdminLogin;
