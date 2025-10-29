// Root.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import getUserInfo from "../hooks/useUserInfo";
import { userLoggedIn, userLoggedOut } from "../store/AuthSlice";
import router from "./Router";
import { getUserInfoFromDatabase } from "../firebase/db";

export default function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = getUserInfo(user);
        const { role } = await getUserInfoFromDatabase(userInfo.uid);
        dispatch(userLoggedIn({ userInfo: { ...userInfo, role } }));
      } else {
        dispatch(userLoggedOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
