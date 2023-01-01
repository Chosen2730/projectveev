import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/config";
import { uploadImage } from "./functions";

export const createProduct = async (isLoggedIn, data, allImages) => {
    if (!isLoggedIn) return;
    // await allImages.forEach(async (imageFile) => {
    //     const res = await uploadImage(imageFile)
    //     const data = { storagePath: res.fullPath, url: res.downloadURL }
    //     imageURLS.push(data);
    // });
    // for (const imageFile of allImages) {
    //     const res = await uploadImage(imageFile)
    //     const data = { storagePath: res.fullPath, url: res.downloadURL }
    //     imageURLS.push(data);
    // };
    var imageURLS = []
    await allImages.reduce(async (ref, imageFile) => {
        await ref;
        const res = await uploadImage(imageFile)
        const data = { storagePath: res.fullPath, url: res.downloadURL }
        imageURLS.push(data);
    }, Promise.resolve())

    if (imageURLS.length === allImages.length) {
        const productData = {
            ...data,
            imageURLS
        };
        await addDoc(collection(db, "products"), productData);

    }
    return "success final";
};