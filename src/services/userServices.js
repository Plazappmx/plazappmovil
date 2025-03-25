import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { fetchData } from "../utils/fetchData";

const usersCollectionRef = collection(db, "users");

export const getAdminUsers = async () => {
  try {
    const q = query(
      usersCollectionRef,
      orderBy("createdAt", "asc"),
      where("role", "==", "admin")
    );
    const res = await fetchData(q);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getOneUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error(error);
  }
};

export const addNotification = async ({ userTenantId, notifDay }) => {
  try {
    const userTenantDocRef = doc(db, "users", userTenantId);

    // Verificar si la notificación ya existe
    const userTenantDoc = await getDoc(userTenantDocRef);
    const notifDays = userTenantDoc.data().notifDays || [];
    if (notifDays.includes(notifDay)) {
      return {
        success: false,
        message: "Ya existe una notificación para este día!",
      };
    }

    await updateDoc(userTenantDocRef, {
      notifDays: arrayUnion(notifDay),
      lastUpdate: serverTimestamp(),
    });

    return {
      success: true,
      message: "Notificación agregada con éxito!",
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotification = async (userTenantId, notifDay) => {
  try {
    const userTenantDocRef = doc(db, "users", userTenantId);

    await updateDoc(userTenantDocRef, {
      notifDays: arrayRemove(notifDay),
      lastUpdate: serverTimestamp(),
    });
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
