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



export const GetUserEntries = async (userId) => {
    try {
        var Entries = []

        const snapshot = await getDocs(collection(db, "users", userId, "journalEntries"))

        snapshot.forEach((doc) => {
            Entries.push({ ...doc.data(), id: doc.id })
        })

        return Entries
    } catch (error) {
        console.log("Error fetching Entries", error)
        return []
    }

}


export const saveJournalEntry = async (userId, JournalEntry) => {
    const userDocRef = doc(db, 'users', userId);
    try {

        const journalEntriesCollection = collection(userDocRef, 'journalEntries');


        await addDoc(journalEntriesCollection, {
            JournalEntry,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error saving journal entry:', error);
    }
};





