import { Outlet } from "react-router";
import Header from "./components/Header";
import { useTheme } from "./context/themeContext";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useDispatch } from "react-redux";
// import { userLoggedIn, userLoggedOut } from "./store/AuthSlice";
// import userUserInfo from "./hooks/useUserInfo";
// import { getDataFromDatabase } from "./firebase/db";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = new FormData();
    data.append("file", "image");
    data.append("cloud_name", "dha51flmf");
  }, []);

  return (
    <>
      <div className={`min-h-screen w-full bg-primary  text-text ${theme}`}>
        <div className="w-full  text-white font-nunito text-sm bg-bluish py-2 flex items-center justify-center">
          Order High Quality Cloths Nowwwww ........
        </div>
        <Header />
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}

export default App;
