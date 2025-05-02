import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getOneStore = async (storeId) => {
  try {
    const docRef = doc(db, "stores", storeId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error(error);
  }
};
