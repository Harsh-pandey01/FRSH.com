import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

export const setDataToDatabase = (uid, role) => {
  // before login what we are going to do is we are going to create
  set(ref(db, "user/" + uid), {
    role,
  });
};

export const getDataFromDatabase = async (uid) => {
  const starCountRef = ref(db, "user/" + uid);
  const snapshot = await get(starCountRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};
