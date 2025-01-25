import { useEffect, useState } from "react";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";

interface Users {
  uid: string;
  email: string;
  createdAt: string; // ISO string format
}

export default function usersFirebase() {
  const [usersChat, setUsersChat] = useState<Users[]>([]);

  useEffect(() => {
    if (!auth?.currentUser) return;

    const q = query(
      collection(db, "users"),
      where("uid", "!=", auth?.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as Users[];
      setUsersChat(itemsData);
    });

    return () => unsubscribe();
  }, []);
  return { usersChat };
}
