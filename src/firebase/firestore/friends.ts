import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

interface FriendData {
  id: string;
  user1: string;
  user2: string;
}

// create data
export async function addFriend(id: string) {
  const user = auth.currentUser;

  if (!user) throw new Error("Belum Login");

  const FriendsData: FriendData = {
    id: user.uid,
    user1: user.uid,
    user2: id,
  };

  try {
    const docRef = doc(db, "users", id);
    const docRef2 = doc(db, "users", user.uid);

    // Update dokumen dengan menambahkan data ke array
    await updateDoc(docRef, {
      teman: arrayUnion(user.uid),
    });
    await updateDoc(docRef2, {
      teman: arrayUnion(id),
    });
    await setDoc(doc(db, "pertemanan", uuidv4()), FriendsData);
    console.log("berhasil menyimpan data");
  } catch (error) {
    console.log("gagal menyimpan data", error);
  }
}

// update doc

// delete doc
