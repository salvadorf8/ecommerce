import { initializeApp } from 'firebase/app';
// we only need one but we're going to talk about both
import { onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// after setting up Firestore DB
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBLn2qS_qaCFByFBG9q8X6NhfloTGsCod4',
    authDomain: 'ecommerce-db-5aa0e.firebaseapp.com',
    databaseURL: 'https://ecommerce-db-5aa0e.firebaseio.com',
    projectId: 'ecommerce-db-5aa0e',
    storageBucket: 'ecommerce-db-5aa0e.appspot.com',
    messagingSenderId: '911699653071',
    appId: '1:911699653071:web:4be24cd83cdc69eef022ba'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// you can have multiple providers example withPopup, withRedirect
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// must only have one Auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// after setting up Firestore DB
export const db = getFirestore();

/**
 * SF comment - just a one time - below uses collection(), and writeBatch()
 */
// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     // just searching, firestore will create automatically even if it's not there
//     const collectionRef = collection(db, collectionKey);
//     // here is where we need a batch - reason is to write these collection in one successful transaction
//     const batch = writeBatch(db);

//     objectsToAdd.forEach((object) => {
//         const docRef = doc(collectionRef, object.title.toLowerCase());
//         batch.set(docRef, object);
//     });

//     await batch.commit();
//     console.log('done');
// };

// google constantly changes their code...uuuurrrrggggg
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    /**
     * SF - comment - below was modified, then rest was commented for redux implementation
     * something NEW PRACTICE
     */
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

    // .reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});

    // return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) {
        return;
    }
    /**
     * SF comment - first we need to see if there is an existing document reference (object that firestore uses)
     * I want you to go to this db, under the users collection, with this user uid
     */
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    /**
     * SF comment - check if user data exists
     * if false, create / set the document with the data from userAuth in my collection
     * if true, return userDocRef
     */
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
        } catch (e) {
            console.log('error creating user', e.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// SF comment - was referred as a listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
