import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../Firebase/config";

export const getAllProducts = (snapshot, error) => {
  const itemsColRef = collection(db, "products");
  const itemsQuery = query(itemsColRef, orderBy("_createdAt"));
  return onSnapshot(itemsQuery, snapshot, error);
};

export const getOrders = async (docLimit) => {
  const productsRef = collection(db, "orders");
  // let first = query(productsRef, orderBy('_createdAt', 'desc'), limit(parseInt(docLimit)));
  let first = query(productsRef, limit(parseInt(docLimit)));
  const documentSnapshots = await getDocs(first).catch((error) => {
    console.log("getOrders error:", error);
  });
  let data = documentSnapshots.docs.map((doc) => ({
    ...doc.data(),
    orderId: doc.id,
  }));
  const lastVisibleItem =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) };
};

export const getUsers = async (docLimit) => {
  const productsRef = collection(db, "users");
  // let first = query(productsRef, orderBy('_createdAt', 'desc'), limit(parseInt(docLimit)));
  let first = query(productsRef, limit(parseInt(docLimit)));
  const documentSnapshots = await getDocs(first).catch((error) => {
    console.log("getUsers error:", error);
  });
  let data = documentSnapshots.docs.map((doc) => ({
    ...doc.data(),
    orderId: doc.id,
  }));
  const lastVisibleItem =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) };
};

export const getUserById = async (uid) => {
  if (uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.log("getProductsByCategory error by trycatch:", error);
      return true;
    }
  } else {
    return true;
  }
};

export const getProductsByCategory = async (category, docLimit) => {
  if (category) {
    try {
      const productsRef = collection(db, "products");
      let q;
      if (docLimit) {
        q = query(
          productsRef,
          where("category", "==", category.toLowerCase()),
          orderBy("updatedAt", "desc"),
          limit(parseInt(docLimit))
        );
      } else {
        q = query(
          productsRef,
          where("category", "==", category),
          orderBy("updatedAt", "desc")
        );
      }
      const documentSnapshots = await getDocs(q).catch((error) => {
        console.log("getProductsByCategory error:", error);
      });
      let data = documentSnapshots?.docs.map((doc) => ({
        ...doc.data(),
        productId: doc.id,
      }));
      const lastVisibleItem =
        documentSnapshots?.docs[documentSnapshots.docs.length - 1];
      return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) };
    } catch (error) {
      console.log("getProductsByCategory error by trycatch:", error);
    }
  } else {
    return null;
  }
};

export const getUsersOrders = async (uid, docLimit) => {
  if (uid) {
    try {
      const productsRef = collection(db, "orders");
      // var q;
      // if (docLimit) {
      //   q = query(
      //     productsRef,
      //     where("uid", "==", uid),
      //     orderBy("updatedAt", "desc"),
      //     limit(parseInt(docLimit))
      //   );
      // } else {
      //   q = query(
      //     productsRef,
      //     where("uid", "==", uid),
      //     orderBy("updatedAt", "desc")
      //   );
      // }
      var q = query(
        productsRef,
        where("uid", "==", uid),
        orderBy("updatedAt", "desc")
      );
      const documentSnapshots = await getDocs(q).catch((error) => {
        console.log("getUsersOrders error:", error);
      });
      console.log(documentSnapshots);
      let data = documentSnapshots?.docs.map((doc) => ({
        ...doc.data(),
        productId: doc.id,
      }));
      const lastVisibleItem =
        documentSnapshots?.docs[documentSnapshots.docs.length - 1];
      return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) };
    } catch (error) {
      console.log("getProductsByCategory error by trycatch:", error);
    }
  } else {
    return null;
  }
};

export const getOrderById = async (orderId) => {
  if (orderId) {
    try {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return "No such document!";
      }
    } catch (error) {
      console.log("getProductsByCategory error by trycatch:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const getAllFeaturedProducts = async (docLimit) => {
  try {
    const productsRef = collection(db, "products");
    let q = query(
      productsRef,
      where("featured", "==", "on"),
      orderBy("createdAt", "desc"),
      limit(parseInt(docLimit))
    );
    const documentSnapshots = await getDocs(q).catch((error) => {
      console.log("getProductsByCategory error:", error);
    });
    console.log(documentSnapshots);
    let data = documentSnapshots?.docs.map((doc) => ({
      ...doc.data(),
      productId: doc.id,
    }));
    console.log(data);
    // console.log(data, q, "this is...", d);
    const lastVisibleItem =
      documentSnapshots?.docs[documentSnapshots.docs.length - 1];
    return {
      data: data ? data : [],
      lastVisibleItem: JSON.stringify(lastVisibleItem),
    };
  } catch (error) {
    console.log("getProductsByCategory error by trycatch:", error);
    return null;
  }
};

export const getAllTrendingProducts = async (docLimit) => {
  try {
    const productsRef = collection(db, "products");
    let q = query(
      productsRef,
      where("trending", "==", "on"),
      orderBy("createdAt", "desc"),
      limit(parseInt(docLimit))
    );
    const documentSnapshots = await getDocs(q).catch((error) => {
      console.log("getProductsByCategory error:", error);
    });
    let data = documentSnapshots?.docs.map((doc) => ({
      ...doc.data(),
      productId: doc.id,
    }));
    const lastVisibleItem =
      documentSnapshots?.docs[documentSnapshots.docs.length - 1];
    return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) };
  } catch (error) {
    console.log("getProductsByCategory error by trycatch:", error);
    return null;
  }
};

export const createUser = async (data) => {
  if (data) {
    console.log(data);
    const user = await getUserById(data.uid);
    console.log({ user });
    if (!user) {
      await addDoc(collection(db, "users"), data);
      window.location.reload();
      return "success";
    }
  } else {
    return "authError";
  }
};

export const addOrder = async (isLoggedIn, data) => {
  if (isLoggedIn) {
    const orderData = {
      ...data,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    const res = (await addDoc(collection(db, "orders"), orderData)).id;
    // window.location.reload()
    return { msg: "success", res };
  } else {
    alert("You have to login to continue");
    return { msg: "authError" };
  }
};

export const deleteOrder = async (orderId) => {
  if (orderId) {
    if (window.confirm("Do you want to delete this order?")) {
      await deleteDoc(doc(db, "orders", orderId)).catch((error) => {
        console.log("An error occured durring order delete: ", error);
      });
      alert("order deleted!");
      window.location.reload();
      return "success";
    } else {
      return "";
    }
  } else {
    alert("You have to login to continue");
    return "authError || itemId not specified!";
  }
};

export const updateOrderStatus = async (id, orderStatus) => {
  if (orderStatus) {
    if (window.confirm(`Do you want to update this order? to ${orderStatus}`)) {
      const docRef = doc(db, "orders", id);
      const data = { orderStatus };

      const res = await updateDoc(docRef, data).catch((error) => {
        console.log(error);
      });
      return { msg: "success", res };
    }
    return { msg: "" };
  } else {
    alert("No status set!");
    return { msg: "authError" };
  }
};

// export const updateProduct = async (isLoggedIn, data, image) => {
//   if (isLoggedIn && image) {
//     // const productData = { ...data, imageUrl: url, imageStoragePATH: storagePATH }
//     // await setDoc(collection(db, "products"), productData, { merge: true });
//     return "success";
//   } else {
//     alert("You have to login to continue");
//     return "authError";
//   }
//   // return 'success final'
// };
export const updateSpecificPropOnProduct = async (
  isLoggedIn,
  propt,
  value,
  productId
) => {
  if (isLoggedIn) {
    const productData = { [propt]: value };
    console.log(productData);
    await updateDoc(doc(db, "products", productId), productData);
    return "success";
  } else {
    alert("You have to login to continue");
    return "authError";
  }
  // return 'success final'
};

export const updateProductStatus = async (isLoggedIn, productId, value) => {
  await updateDoc(doc(db, "products", productId), {
    status: value,
  });
  return "success";
};

// export const uploadImage = async (isLoggedIn, image) => {
//   var imageURL = '';
//   var progress = 0;
//   var storagePATH = `products/${image.name}`;
//   const storage = getStorage();
//   if (isLoggedIn) {
//     // const metadata = 'image/jpeg';
//     // var file = new File([image], fileName, { type: contentType });

//     const storageRef = ref(storage, storagePATH);
//     const uploadTask = uploadBytesResumable(storageRef, image);

//     uploadTask.on(
//       "state_change",
//       (snapshot) => {
//         progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//             // console.log("Upload is default");
//           // break;
//         }
//       },
//       (error) => {
//         console.log(error.message);
//       },
//       (e) => {
//         console.log(e);
//         getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
//           console.log("File available at", url);
//           imageURL = url;
//         });
//       }
//     );
//   }

//   return "success";
// };

export const uploadImage = async (file, productId) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const s = await uploadBytes(storageRef, file).then((snapshot) => snapshot);
    const downloadURL = await getDownloadURL(storageRef, s);
    // console.log(downloadURL);
    const fullPath = s.metadata.fullPath;
    return { downloadURL, fullPath };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserStatus = async (uid, userStatus) => {
  if (userStatus) {
    if (
      window.confirm(
        `Do you want to ${userStatus === true ? "BLOCK" : "UNBLOCK"} this user?`
      )
    ) {
      const docRef = doc(db, "users", uid);
      const data = { blocked: userStatus };

      const res = await updateDoc(docRef, data).catch((error) => {
        console.log(error);
      });
      return { msg: "success", res };
    }
    return { msg: "" };
  } else {
    alert("No status set!");
    return { msg: "authError" };
  }
};
