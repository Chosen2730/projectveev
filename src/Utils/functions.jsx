import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../Firebase/config";

export const getAllProducts = async (docLimit) => {
    const productsRef = collection(db, "products");
    // let first = query(productsRef, orderBy('_createdAt', 'desc'), limit(parseInt(docLimit)));
    let first = query(productsRef, limit(parseInt(docLimit)));
    const documentSnapshots = await getDocs(first).catch(error => { console.log('getAllProducts error:', error) });
    let data = documentSnapshots.docs.map(doc => ({ ...doc.data(), productId: doc.id }));
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
