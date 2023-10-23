import { Timestamp, addDoc, collection, doc, getDocs, orderBy, query, setDoc, ref, onValue, serverTimestamp, updateDoc, docRef } from "firebase/firestore"
import { db } from "../firebase"


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



//EXAMPLE OF CREATING JOURNAL ENTRY IN DB
// const saveJournalEntry = async (userId, entry) => {
//   const userDocRef = doc(db, 'users', userId);
//   try {
//     // Assuming 'journalEntries' is a subcollection for journal entries.
//     await setDoc(doc(userDocRef, 'journalEntries', new Date().toISOString()), {
//       entry,
//       timestamp: new Date(),
//     });
//   } catch (error) {
//     console.error('Error saving journal entry:', error);
//   }
// };