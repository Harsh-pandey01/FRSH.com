import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

export const setDataToDatabase = (uid, role) => {
 
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
