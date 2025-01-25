import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./firebase";

export default function searchUserFirebase() {
  const [search, setSearch] = useState<any>(null);
  const handleSearch = async (e: any) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const username = fromData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", username));
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setSearch(querySnapShot.docs[0].data());
      } else {
        console.log("user not found");
      }
    } catch (error) {
      console.log("error search", error);
    }
  };
  return { handleSearch, search };
  //   useEffect(() => {
  //     if (!auth?.currentUser) return;

  //     const q = query(
  //       collection(db, "users"),
  //       where("uid", "!=", auth?.currentUser.uid)
  //     );
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const itemsData = snapshot.docs.map((doc) => ({
  //         uid: doc.id,
  //         ...doc.data(),
  //       })) as Users[];
  //       setUsersChat(itemsData);
  //     });

  //     return () => unsubscribe();
  //   }, []);
  //   return { usersChat };
}
