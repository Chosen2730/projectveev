import { addDoc, collection, deleteDoc, doc, startAt, endAt, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../Firebase/config";

export const getAllProducts = async (_startAt, docLimit) => {
    console.log(_startAt);
    const productsRef = collection(db, "products");
    let q = query(productsRef, orderBy('title'), startAt(3), limit(docLimit));
    const documentSnapshots = await getDocs(q).catch(error => { console.log('getAllProducts error:', error) });
    let data = documentSnapshots.docs.map(doc => ({ ...doc.data(), productId: doc.id }));
    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // return { data, lastVisibleItem: JSON.stringify(lastVisible) }
    return { data }
}

export const getOrders = async (docLimit) => {
    const productsRef = collection(db, "orders");
    // let first = query(productsRef, orderBy('_createdAt', 'desc'), limit(parseInt(docLimit)));
    let first = query(productsRef, limit(parseInt(docLimit)));
    const documentSnapshots = await getDocs(first).catch(error => { console.log('getOrders error:', error) });
    let data = documentSnapshots.docs.map(doc => ({ ...doc.data(), orderId: doc.id }));
    const lastVisibleItem = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) }
}

export const getUsers = async (docLimit) => {
    const productsRef = collection(db, "users");
    // let first = query(productsRef, orderBy('_createdAt', 'desc'), limit(parseInt(docLimit)));
    let first = query(productsRef, limit(parseInt(docLimit)));
    const documentSnapshots = await getDocs(first).catch(error => { console.log('getUsers error:', error) });
    let data = documentSnapshots.docs.map(doc => ({ ...doc.data(), orderId: doc.id }));
    const lastVisibleItem = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) }
}

export const getProductsByCategory = async (category, docLimit) => {
    if (category) {
        try {
            const productsRef = collection(db, "products");
            let q;
            if (docLimit) {
                q = query(productsRef, where('category', '==', category.toLowerCase()), orderBy('updatedAt', 'desc'), limit(parseInt(docLimit)));
            } else {
                q = query(productsRef, where('category', '==', category), orderBy('updatedAt', 'desc'));
            }
            const documentSnapshots = await getDocs(q).catch(error => { console.log('getProductsByCategory error:', error) });
            let data = documentSnapshots?.docs.map(doc => ({ ...doc.data(), productId: doc.id }));
            const lastVisibleItem = documentSnapshots?.docs[documentSnapshots.docs.length - 1];
            return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) }
        } catch (error) {
            console.log('getProductsByCategory error by trycatch:', error)
        }
    } else {
        return null
    }
}

export const getAllFeaturedProducts = async (docLimit) => {
    try {
        const productsRef = collection(db, "products");
        let q = query(productsRef, where('featured', '==', true), orderBy('title', 'desc'), limit(parseInt(docLimit)));
        const documentSnapshots = await getDocs(q).catch(error => { console.log('getProductsByCategory error:', error) });
        let data = documentSnapshots?.docs.map(doc => ({ ...doc.data(), productId: doc.id }));
        const lastVisibleItem = documentSnapshots?.docs[documentSnapshots.docs.length - 1];
        return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) }
    } catch (error) {
        console.log('getProductsByCategory error by trycatch:', error)
        return null
    }
}

export const getAllTrendingProducts = async (docLimit) => {
    try {
        const productsRef = collection(db, "products");
        let q = query(productsRef, where('trending', '==', true), orderBy('title', 'desc'), limit(parseInt(docLimit)));
        const documentSnapshots = await getDocs(q).catch(error => { console.log('getProductsByCategory error:', error) });
        let data = documentSnapshots?.docs.map(doc => ({ ...doc.data(), productId: doc.id }));
        const lastVisibleItem = documentSnapshots?.docs[documentSnapshots.docs.length - 1];
        return { data, lastVisibleItem: JSON.stringify(lastVisibleItem) }
    } catch (error) {
        console.log('getProductsByCategory error by trycatch:', error)
        return null
    }
}

export const addProduct = async (isLoggedIn, data, image) => {
    if (isLoggedIn && image) {
        var storagePATH = `products/${image.name}`;
        const storage = getStorage()
        const storageRef = ref(storage, storagePATH);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_change", async (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
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
                        const productData = { ...data, imageUrl: url, imageStoragePATH: storagePATH }
                        await addDoc(collection(db, "products"), productData);
                        window.location.reload()
                        return 'success'
                    } else {
                        return 'error'
                    }
                });
            }
        );

    } else {
        alert('You have to login to continue');
        return 'authError'
    }
    return 'success final'
}

export const addOrder = async (isLoggedIn, data) => {
    if (isLoggedIn) {
        const orderData = { ...data, createdAt: new Date().getTime() }
        const res = (await addDoc(collection(db, "orders"), orderData)).id;
        // window.location.reload()
        return { msg: 'success', res }

    } else {
        alert('You have to login to continue');
        return { msg: 'authError' }
    }
}

export const deleteOrder = async (orderId) => {
    if (orderId) {
        if (window.confirm("Do you want to delete this order?")) {
            await deleteDoc(doc(db, "orders", orderId)).catch((error) => {
                console.log("An error occured durring order delete: ", error);
            });
            alert('order deleted!');
            window.location.reload()
            return 'success'
        } else {
            return ''
        }
    } else {
        alert('You have to login to continue');
        return 'authError || itemId not specified!'
    }
}

export const updateOrderStatus = async (id, orderStatus) => {
    if (orderStatus) {
        if (window.confirm(`Do you want to update this order? to ${orderStatus}`)) {
            const docRef = doc(db, "orders", id);
            const data = { orderStatus };

            const res = await updateDoc(docRef, data).catch(error => {
                console.log(error);
            })
            return { msg: 'success', res }
        }
        return { msg: ''}

    } else {
        alert('No status set!');
        return { msg: 'authError' }
    }
}

export const updateProduct = async (isLoggedIn, data, image) => {
    if (isLoggedIn && image) {
        // const productData = { ...data, imageUrl: url, imageStoragePATH: storagePATH }
        // await setDoc(collection(db, "products"), productData, { merge: true });
        return 'success'


    } else {
        alert('You have to login to continue');
        return 'authError'
    }
    // return 'success final'
}

export const deleteProduct = async (isLoggedIn, productId, imageStoragePATH) => {
    if (isLoggedIn && productId) {
        const storage = getStorage();
        const desertRef = ref(storage, imageStoragePATH);
        deleteObject(desertRef).then(async () => {
            await deleteDoc(doc(db, "products", productId));
        }).catch((error) => {
            console.log("An error occured durring product image delete: ", error);
        });

        // window.location.reload()
        return 'success'
    } else {
        alert('You have to login to continue');
        return 'authError || itemId not specified!'
    }
}

export const updateProductStatus = async (isLoggedIn, productId, value) => {
    await updateDoc(doc(db, "products", productId), {
        status: value
    });
    return 'success'
}

export const uploadImage = async (isLoggedIn, image, setUrl) => {
    var storagePATH = `products/${image.name}`;
    const storage = getStorage()
    if (isLoggedIn) {
        // const metadata = 'image/jpeg';
        // var file = new File([image], fileName, { type: contentType });

        const storageRef = ref(storage, storagePATH);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_change", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    console.log('Upload is default');
                // break;
            }
        },
            (error) => {
                console.log(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    console.log('File available at', url);
                    setUrl(url)
                });
            }
        );

    }

    return 'success'
}
