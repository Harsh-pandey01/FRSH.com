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
import toast from "react-hot-toast";
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

  try {
    const Prom1 = await setDoc(doc(db, "products", productId), {
      ...productInfoConfig,
      adminId: uid,
      createdAt: new Date(),
    });

    const Prom2 = updateDoc(userRef, {
      products: arrayUnion({ productId }),
    });

    toast.promise(Prom2, {
      loading: "Almost Done",
      success: "Product Added Successfully",
      error: (err) => err.message || "Something Went Wrong",
    });

    return true;
  } catch (error) {
    console.log(error);
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

export async function updateAdminOrders(orders) {
  const toastId = toast.loading("Placing your order...");

  try {
    // Group by admin to reduce writes
    const groupedOrders = orders.reduce((acc, order) => {
      if (!acc[order.adminID]) acc[order.adminID] = [];
      acc[order.adminID].push(order);
      return acc;
    }, {});

    for (const [adminID, adminOrders] of Object.entries(groupedOrders)) {
      const adminRef = doc(db, "users", adminID);

      for (const ord of adminOrders) {
        await updateDoc(adminRef, {
          adminOrders: arrayUnion({
            orderID: ord.orderID,
            orderStatus: ord.orderStatus,
            userData: ord.userData,
            productInfo: ord.productInfo,
            createdAt: new Date(),
          }),
        });
      }
    }

    toast.success("✅ Order placed successfully!", { id: toastId });
    console.log("Orders updated successfully");
  } catch (error) {
    toast.error("❌ Failed to place order. Try again.", { id: toastId });
    console.error("Error updating admin orders:", error);
  }
}
