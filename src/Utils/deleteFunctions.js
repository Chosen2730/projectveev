import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../Firebase/config";

export const deleteImage = async (imageStoragePath) => {
  const storage = getStorage();
  deleteObject(ref(storage, imageStoragePath))
    .then(async () => {})
    .catch((error) => {
      alert("An error occured durring product image delete: ", error);
    });
  return;
};
export const deleteProduct = async (isLoggedIn, productId, imagesURL) => {
  if (isLoggedIn && productId) {
    // const storage = getStorage();
    imagesURL.forEach(async (image) => {
      await deleteImage(image.storagePath);
      // deleteObject(ref(storage, image.storagePath))
      //     .then(async () => {
      //     })
      //     .catch((error) => {
      //
      //     });
    });
    await deleteDoc(doc(db, "products", productId));

    // window.location.reload()
    return "success";
  } else {
    alert("An error occured! be sure you're logged in and try again.");
    return "authError || itemId not specified!";
  }
};
