import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const storage = getStorage();

export const generateDocFileData = async ({ file, docType }) => {
  const now = new Date();
  const formattedDate = now
    .toISOString()
    .replace(/[:-]/g, "")
    .replace("T", "-")
    .replace(/\.\d{3}Z/, "");
  const imageName = `doc-${formattedDate}`;
  const filePath = `${docType}/${imageName}`;
  const storageRef = ref(storage, filePath);

  const fileBlob = await fetch(file.uri).then((res) => res.blob());

  const metadata = {
    contentType: file.mimeType || "application/octet-stream",
  };

  const imageSnapshot = await uploadBytes(storageRef, fileBlob, metadata);

  if (!imageSnapshot) throw new Error("Ocurrió un error al subir la imágen!");
  const fileUrl = await getDownloadURL(imageSnapshot.ref);

  return { fileUrl: fileUrl, filePath: imageSnapshot.metadata.fullPath };
};
