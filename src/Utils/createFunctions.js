import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/config";
import { uploadImage } from "./functions";

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

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

  const id = string_to_slug(data.title);
  var imageURLS = [];
  await allImages.reduce(async (ref, imageFile) => {
    await ref;
    const res = await uploadImage(imageFile, id, "products");
    var timestamp = (Date.now() + Math.random()).toFixed(); // new Date().getUTCMilliseconds();
    const d = {
      storagePath: res.fullPath,
      url: res.downloadURL,
      id: timestamp,
    };
    imageURLS.push(d);
  }, Promise.resolve());

  if (imageURLS.length === allImages.length) {
    const productData = {
      ...data,
      id,
      imageURLS,
    };
    await addDoc(collection(db, "products"), productData);
  }
  return "success final";
};

export const createCustomOrder = async (data, allImages) => {
  const id = Date.now();
  var imageURLS = [];
  if (allImages.length > 0) {
    await allImages.reduce(async (ref, imageFile) => {
      await ref;
      const res = await uploadImage(imageFile, id, "customOrder");
      var timestamp = (Date.now() + Math.random()).toFixed(); // new Date().getUTCMilliseconds();
      const d = {
        storagePath: res.fullPath,
        url: res.downloadURL,
        id: timestamp,
      };
      imageURLS.push(d);
    }, Promise.resolve());
  }

  if (imageURLS.length === allImages.length) {
    const productData = {
      ...data,
      id,
      imageURLS,
    };
    await addDoc(collection(db, "customOrder"), productData);
  }
  return "success final";
};
