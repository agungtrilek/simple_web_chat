import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function pertemananFIrebase() {
  const [teman, setTeman] = useState<any>([]);
  const handlePertemanan = async (uidUser: any) => {
    if (!auth?.currentUser?.uid) {
      console.error("Pengguna tidak terautentikasi.");
      return;
    }
    const dataPertemanan = {
      id: auth?.currentUser.uid,
      user1: auth?.currentUser.uid,
      user2: uidUser.uid,
    };
    try {
      const docRef = doc(db, "users", uidUser.uid);

      // Update dokumen dengan menambahkan data ke array
      await updateDoc(docRef, {
        teman: arrayUnion(auth?.currentUser.uid),
      });
      await setDoc(doc(db, "pertemanan", uuidv4()), dataPertemanan);
      console.log("berhasil menyimpan data");
    } catch (error) {
      console.log("gagal menyimpan data", error);
    }
  };

  useEffect(() => {
    if (!auth?.currentUser) return;

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pertemanan"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeman(data);
      } catch (error) {
        console.error("Error membaca data:", error);
      }
    };

    fetchData();
  }, []);

  return { teman, handlePertemanan };
}
