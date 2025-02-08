import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import useHooks from "../../Hook/useHooks";
import { db } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

interface AddFriendPayload {
  uidUser: string;
}
interface FriendData {
  id: string;
  user1: string;
  user2: string;
}

// create data
export async function addFriend({ payload }: { payload: AddFriendPayload }) {
  const { userAuth } = useHooks();
  if (!userAuth?.uid) {
    console.error("Pengguna tidak terautentikasi.");
    return;
  }

  const { uidUser } = payload;

  const FriendsData: FriendData = {
    id: userAuth.uid,
    user1: userAuth.uid,
    user2: uidUser,
  };

  try {
    const docRef = doc(db, "users", uidUser);

    // Update dokumen dengan menambahkan data ke array
    await updateDoc(docRef, {
      teman: arrayUnion(userAuth.uid),
    });
    await setDoc(doc(db, "pertemanan", uuidv4()), FriendsData);
    console.log("berhasil menyimpan data");
  } catch (error) {
    console.log("gagal menyimpan data", error);
  }
}

export function listenToFriends(callback: (friends: FriendData[]) => void) {
  const querySnapshot = collection(db, "pertemanan");
  const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
    const friendList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FriendData[];
    callback(friendList);
  });
  return unsubscribe;
}

// update doc

// delete doc
