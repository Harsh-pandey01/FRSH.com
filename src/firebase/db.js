import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
export const db = getFirestore(app);

function createUser(role) {
  const user = { role };
  if (role === "admin") {
    user.products = [];
  }
  return user;
}

export const createUserInDatabase = async (uid, role) => {
  try {
    const userData = createUser(role);
    await setDoc(doc(db, "users", uid), userData);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getUserInfoFromDatabase = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

export const addNewItemByTheAdmin = async (uid, productInfoConfig) => {
  const userRef = doc(db, "users", uid);
  const { productId } = productInfoConfig;
  console.log(productInfoConfig);
  try {
    const productsCollectionRef = collection(db, "products");

    // Create a new document inside "products"
    await addDoc(productsCollectionRef, {
      ...productInfoConfig,
      adminId: uid, // track who added it
      createdAt: new Date(), // optional timestamp
    });
    await updateDoc(userRef, {
      products: arrayUnion({ productId, uid }),
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const getListOfAllTheProductByAnAdmin = async (uid) => {
  try {
    const productsRef = collection(db, "products"); // reference to the "products" collection
    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    // filtering the products based on the admin id
    const itemsByAdmin = products.filter((item) => {
      return item.adminId === uid;
    });

    return itemsByAdmin;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getListOflatestProducts = async (productsCount) => {
  const querySnapshot = await getDocs(collection(db, "products"));
  let products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  products.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  const requiredResult = productsCount
    ? products.slice(0, productsCount)
    : products;

  return requiredResult;
};
