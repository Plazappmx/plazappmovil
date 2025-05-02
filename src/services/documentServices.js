import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { generateDocFileData, storage } from "./fileServices";
import { deleteObject, ref } from "firebase/storage";
import { GEN_DOCS_DICTIONARY, MONTHS_DICTIONARY } from "../utils/consts";
import { getOneUser } from "./userServices";

export const uploadDocument = async ({ userId, file, docName, docType }) => {
  try {
    if (!file) throw new Error(`No hay archivo para procesar.`);

    const fileData = await generateDocFileData({ file, docType });
    if (!fileData) throw new Error(`No fue posible procesar el archivo`);

    const docIndex =
      docType === "general" || docType === "lessor"
        ? GEN_DOCS_DICTIONARY[docName]
        : MONTHS_DICTIONARY[docName];

    if (!docIndex)
      throw new Error("No fue posible generar el index del subdocumento");

    // Colección
    const documentsCollectionRef = collection(db, "documents");

    const q = query(documentsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let docRef;

    if (!querySnapshot.empty) {
      docRef = querySnapshot.docs[0].ref;
    } else {
      console.log("Agregando nuevo doc");
      docRef = await addDoc(documentsCollectionRef, {
        userId,
        allowDeleteDocs: [],
      });
      console.log(`Documento creado con ID: ${docRef.id}`);
    }

    // Subcolección
    const documentsSubcollectionRef = collection(docRef, docType);

    const docNameQuery = query(
      documentsSubcollectionRef,
      where("docName", "==", docName)
    );
    const nameQuerySnapshot = await getDocs(docNameQuery);

    if (!nameQuerySnapshot.empty) {
      console.error(`Error: Ya existe un documento con el nombre ${docName}.`);
      return;
    }

    const newDocRef = doc(documentsSubcollectionRef);
    const docId = newDocRef.id;

    await setDoc(
      newDocRef,
      {
        docName,
        docIndex,
        fileUrl: fileData.fileUrl,
        filePath: fileData.filePath,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`Subdocumento creado con ID: ${docId}`);

    await sendDocNotification(userId, docType, docName);
  } catch (error) {
    console.error("Error creating or updating document:", error);
  }
};

export const getDocumentsByUserAndSubcollection = async (userId, docType) => {
  try {
    const generalDocsCollectionRef = collection(db, "documents");

    const q = query(generalDocsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(
        `No se encontró ningún documento para el usuario con ID: ${userId}`
      );
      return { docs: [], allowDeleteDocs: [] };
    }

    const mainDoc = querySnapshot.docs[0];
    const docRef = mainDoc.ref;

    const allowDeleteDocs = mainDoc.data().allowDeleteDocs || [];

    const subcollectionRef = collection(docRef, docType);
    const orderedQuery = query(subcollectionRef, orderBy("docIndex"));

    const subcollectionSnapshot = await getDocs(orderedQuery);

    if (subcollectionSnapshot.empty) {
      return { docs: [], allowDeleteDocs };
    }

    const documents = subcollectionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      docs: documents,
      allowDeleteDocs,
    };
  } catch (error) {
    console.error(
      "Error obteniendo documentos por usuario y subcolección:",
      error
    );
    return [];
  }
};

export const deleteDocumentAndFile = async ({ userId, docType, docId }) => {
  try {
    const generalDocsCollectionRef = collection(db, "documents");

    const q = query(generalDocsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(
        `No se encontró ningún documento para el usuario con ID: ${userId}`
      );
      return;
    }

    const docRef = querySnapshot.docs[0].ref;
    const documentRef = doc(docRef, docType, docId);

    const documentSnapshot = await getDoc(documentRef);
    const documentData = documentSnapshot.data();

    const filePath = documentData.filePath;

    if (filePath) {
      const storageRef = ref(storage, filePath);

      await deleteObject(storageRef);
    }

    await deleteDoc(documentRef);
    console.log(
      `Documento con ID: ${docId} eliminado exitosamente de Firestore y su archivo de Storage.`
    );
  } catch (error) {
    console.error("Error al eliminar el documento o el archivo:", error);
  }
};

export const analyzeDocument = async (base64) => {
  try {
    console.log("Analizando documento...");
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [{ type: "TEXT_DETECTION" }],
            },
          ],
        }),
      }
    );

    const result = await response.json();
    const fullText = result?.responses?.[0]?.fullTextAnnotation?.text;

    if (fullText) {
      const curpMatch = fullText?.match(
        /[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[0-9A-Z]\d/
      );
      const curp = curpMatch ? curpMatch[0] : null;

      // Nombres, apellidos y fecha de nacimiento
      const lines = fullText.split("\n").map((line) => line.trim());

      let names = null;
      let paternalSurname = null;
      let maternalSurname = null;
      let birthDate = null;

      // Fecha de nacimiento (formato dd/mm/aaaa o dd-mm-aaaa o similar)
      // const birthDateMatch = fullText.match(/(\d{2}[-\/]\d{2}[-\/]\d{4})/);
      // const birthDate = birthDateMatch ? birthDateMatch[0] : null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].toUpperCase();

        if (
          line.includes("NOMBRE") ||
          line.includes("NOMBRES") ||
          line.includes("NOMBRE(S)")
        ) {
          names = lines[i + 1]?.trim();
          // Si el nombre viene junto con los apellidos línea por línea
          // names = `${lines[i + 3]?.trim()} ${lines[i + 1]?.trim()} ${lines[i + 2]?.trim()}`;
        }

        if (line.includes("APELLIDO PATERNO")) {
          paternalSurname = lines[i + 1]?.trim();
        }

        if (line.includes("APELLIDO MATERNO")) {
          maternalSurname = lines[i + 1]?.trim();
        }

        // Si está todo en una sola línea
        const matchFullName = line.match(/NOMBRE(?:S)?[:\s]+([A-Z\s]+)/);
        if (matchFullName) {
          const fullNameParts = matchFullName[1].trim().split(/\s+/);
          if (fullNameParts.length >= 3) {
            paternalSurname = fullNameParts[0];
            maternalSurname = fullNameParts[1];
            names = fullNameParts.slice(2).join(" ");
          }
        }

        if (line.includes("NACIMIENTO")) {
          const birthDateMatch =
            lines[i].match(/\d{2}[-\/]\d{2}[-\/]\d{4}/) ||
            lines[i + 1]?.match(/\d{2}[-\/]\d{2}[-\/]\d{4}/);
          if (birthDateMatch) {
            birthDate = birthDateMatch[0];
            break;
          }
        }
      }

      const data = {
        curp,
        names,
        paternalSurname,
        maternalSurname,
        birthDate,
      };

      return { data, fullText };
    }

    console.log("El documento no contiene la información solicitada");
  } catch (error) {
    console.error("❌ Error al analizar el documento:", error);
  }
};

export const sendDocNotification = async (userId, docType, docName) => {
  try {
    const user = await getOneUser(userId);
    const { name: userDisplayName, adminId } = user ?? {};

    const admin = await getOneUser(adminId);
    const { email: adminEmail } = admin ?? {};

    const res = await fetch(process.env.EXPO_PUBLIC_DOC_NOTIFICATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDisplayName,
        adminEmail,
        docType,
        docName,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("No se pudo enviar la notificación");
    }
    console.log(data.message);
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
  }
};
