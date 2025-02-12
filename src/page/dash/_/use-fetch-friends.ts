import React, { useEffect, useState } from "react";
import { listenToFriends } from "../../../firebase/firestore/friends";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../firebase/config/firebase";

interface Teman {
  id: string;
  [key: string]: any;
}
export default function useFetchFriends() {
  const [friend, setFriend] = useState<Teman[]>([]);
  const user = auth.currentUser;
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      collection(db, "pertemanan"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriend(data);
      },
      (error) => {
        console.error("Error membaca data:", error);
      }
    );

    return () => unsubscribe(); // Membersihkan listener saat komponen unmount
  }, [user]);
  return friend;
}
