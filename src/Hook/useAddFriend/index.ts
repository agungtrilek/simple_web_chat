import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config/firebase";
import { addFriend, listenToFriends } from "../../firebase/firestore/friends";

export default function useFriends() {
  const [teman, setTeman] = useState<any>([]);

  const handleAddFriend = async (uidUser: any) => {
    try {
      await addFriend({ payload: { uidUser } });
      console.log("teman berhasil ditambahkan");
    } catch (error) {
      console.error("gagal menambahkan teman", error);
    }
  };

  useEffect(() => {
    const unsubscribe = listenToFriends((friends) => {
      setTeman(friends);
    });
    return () => unsubscribe();
  }, []);

  return { teman, handleAddFriend };
}
