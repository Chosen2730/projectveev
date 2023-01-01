import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../Firebase/config";

export const deleteProduct = async (
    isLoggedIn,
    productId,
    imagesURL
) => {
    console.log(isLoggedIn, productId, imagesURL);
    if (isLoggedIn && productId) {
        const storage = getStorage();
        imagesURL.forEach(image => {
            deleteObject(ref(storage, image.storagePath))
                .then(async () => {
                })
                .catch((error) => {
                    console.log("An error occured durring product image delete: ", error);
                });
        });
        await deleteDoc(doc(db, "products", productId));
        // console.log('deleted');

        // window.location.reload()
        return "success";
    } else {
        alert("An error occured! be sure you're logged in and try again.");
        return "authError || itemId not specified!";
    }
};