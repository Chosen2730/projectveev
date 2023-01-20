import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/config";

export const updateProduct = async (id, data) => {
  if (id) {
    const docRef = doc(db, "products", id);
    const res = await updateDoc(docRef, data).catch((error) => {});
    return { msg: "success", res };
  }
  return { msg: "error", res: id };
};
