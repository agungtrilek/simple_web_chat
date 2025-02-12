import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config/firebase";

import React from "react";

export default function useFetchChats() {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const messagesCollection = collection(db, "chats");
    const messagesQuery = query(
      messagesCollection,
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    // Bersihkan listener saat komponen unmount
    return () => unsubscribe();
  }, []);

  return messages;
}
