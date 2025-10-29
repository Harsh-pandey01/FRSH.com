import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app, auth } from "./firebaseConfig";
import toast from "react-hot-toast";

import { createUserInDatabase } from "./db";

const provider = new GoogleAuthProvider();

export const signupUser = async (userDetail) => {
  const { userEmail: email, password } = userDetail;
  console.log(email, password);
  const signUpPromise = createUserWithEmailAndPassword(auth, email, password);
  toast.promise(signUpPromise, {
    loading: "Creating your account...",
    success: "Account created successfully!",
    error: (err) => err.message || "Something went wrong!",
  });

  try {
    const userCredential = await signUpPromise;
    return userCredential.user;
  } catch (error) {
    return null;
  }
};

export const signUpWithGoogle = async (role) => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Get credential and token if needed
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log(user, role);
    const res = await createUserInDatabase(user.uid, role);
    toast.success("Signed Up Successfully");
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    return null;
  }
};

export const loginWithEmail = async ({ email, password }) => {
  const loginPromise = signInWithEmailAndPassword(auth, email, password);

  toast.promise(loginPromise, {
    loading: "Loggin You ..",
    success: "Logged in succesfully",
    error: (err) => err.message || "Something went wrong!",
  });

  try {
    const res = await loginPromise;

    return res;
  } catch (error) {
    return null;
  }
};

export const logOut = async () => {
  try {
    const res = await signOut(auth);
  } catch (error) {
    toast.error(error);
  }
};
