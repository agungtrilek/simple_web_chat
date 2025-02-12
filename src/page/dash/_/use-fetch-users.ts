import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config/firebase";

interface Users {
  uid: string;
  email: string;
  createdAt: string; // ISO string format
}

export default function useFetchUsers() {
  const [usersChat, setUsersChat] = useState<Users[]>([]);
  const user = auth.currentUser;
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "users"), where("uid", "!=", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as Users[];
      setUsersChat(itemsData);
    });

    return () => unsubscribe();
  }, [user]);
  return usersChat;
}
