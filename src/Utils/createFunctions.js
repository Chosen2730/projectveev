import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../Firebase/config";

export const createProduct = async (isLoggedIn, data, image) => {
    if (isLoggedIn && image) {
        var storagePATH = `products/${image.name}`;
        const storage = getStorage();
        const storageRef = ref(storage, storagePATH);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_change",
            async (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        // console.log('Upload is running');
                        break;
                    default:
                    // console.log('Upload is default');
                    // break;
                }
            },
            (error) => {
                console.log(error.message);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    if (url) {
                        const productData = {
                            ...data,
                            imageUrl: url,
                            imageStoragePATH: storagePATH,
                        };
                        await addDoc(collection(db, "products"), productData);
                        // window.location.reload();
                        return "success";
                    } else {
                        return "error";
                    }
                });
            }
        );
    } else {
        alert("You have to login to continue");
        return "authError";
    }
    return "success final";
};