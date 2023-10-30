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
            Entries.push({...doc.data(), id: doc.id})
        })

        return Entries
    } catch (error) {
        console.log("Error fetching Entries", error)
        return[]
    }

}

// EXAMPLE OF CREATING JOURNAL ENTRY IN DB
// export const saveJournalEntry = async (userId, JournalEntry) => {
//     const userDocRef = doc(db, 'users', userId);
//     try {
      
//       await setDoc(doc(userDocRef, 'journalEntries', new Date().toISOString()), {
//         JournalEntry,
//         timestamp: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error('Error saving journal entry:', error);
//     }
//   };


// export const saveJournalEntry = async (userId, JournalEntry) => {
//   const userDocRef = doc(db, 'users', userId);
//   try {
//     await setDoc(doc(userDocRef, 'journalEntries'), {
//       JournalEntry,
//       timestamp: serverTimestamp(),
//     });
//   } catch (error) {
//     console.error('Error saving journal entry:', error);
//   }
// };

export const saveJournalEntry = async (userId, JournalEntry) => {
    const userDocRef = doc(db, 'users', userId);
    try {
      // Use .collection() to access the "journalEntries" subcollection
      const journalEntriesCollection = collection(userDocRef, 'journalEntries');
      
      // Now, you can add documents within the "journalEntries" subcollection
      await addDoc(journalEntriesCollection, {
        JournalEntry,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };
  




