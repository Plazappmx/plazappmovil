import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getOneUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error(error);
  }
};

export const addContactInfo = async (contactInfo, userTenantId) => {
  try {
    const userTenantDocRef = doc(db, "users", userTenantId);

    await updateDoc(userTenantDocRef, {
      ...contactInfo,
      lastUpdate: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const acceptTerms = async (userId) => {
  try {
    const userTenantDocRef = doc(db, "users", userId);

    await updateDoc(userTenantDocRef, {
      termsAccepted: true,
      lastUpdate: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};
