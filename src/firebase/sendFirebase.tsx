import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import useHooks from "../hooks/useHooks";

const useSendFirebase = () => {
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const { userAuth } = useHooks();
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

  // const fetchMessages = (setMessages: any) => {
  //     const messagesCollection = collection(db, "chats");
  //     const messagesQuery = query(
  //   messagesCollection,
  //   orderBy("timestamp", "asc")
  // );

  // onSnapshot(messagesQuery, (snapshot) => {
  //       const messages = snapshot.docs.map((doc) => ({
  //             id: doc.id, // ID dokumen
  //             ...doc.data(), // Data dokumen
  //           }));
  //           setMessages(messages);
  //         });
  //       };

  //   const handleSend = () => {
  //     if (message.trim()) {
  //       sendMessage(message);
  //       setMessage("");
  //     }
  //   };

  const handleSend = async (idReceiver) => {
    if (message.trim()) {
      const messagesCollection = collection(db, "chats");
      await addDoc(messagesCollection, {
        text: message,
        sender: userAuth?.uid,
        timestamp: Date.now(),
        to: idReceiver,
      });
      setMessage("");
    }
  };
  return {
    setMessage,
    setMessages,
    message,
    messages,
    handleSend,
  };
};
export default useSendFirebase;
