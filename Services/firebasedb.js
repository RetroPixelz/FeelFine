import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, setDoc, ref, onValue, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
// import { uploadToStorage } from "./firebaseStorage";


//--USER COLLCTION
export const createUserInDb = async (email, username, uid) => {

    try {
        console.log("creating user in db..." + uid);
        const docRef = await setDoc(doc(db, "users", uid), {
            email,
            username,
        })
       

    } catch (e) {
        console.log("something went wromg: " + e)
    }

}