import { auth, db } from "../firebase/config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { logout } from "../firebase/fireauth/logout";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

interface Users {
  uid: string;
  email: string;
  createdAt: string; // ISO string format
}

export default function useHooks() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [idToChat, setIdToChat] = useState(null);
  const [path, setPath] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [usersChat, setUsersChat] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const formatTimestampToTime = (timestampMs: any, useUTC = true) => {
    const date = new Date(timestampMs);

    // Choose appropriate methods based on UTC preference
    const hours = useUTC ? date.getUTCHours() : date.getHours();
    const minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();

    // Format the time
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    // Pantau status autentikasi
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserAuth(user);
        navigate("/dashboard"); // Arahkan ke dashboard jika login
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // pertemanan

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // userFirebase

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

  // send firebase

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
    location,
    email,
    password,
    confirmPassword,
    error,
    userAuth,
    loading,
    idToChat,
    usersChat,
    navigate,
    setEmail,
    setPath,
    setPassword,
    setConfirmPassword,
    setIdToChat,
    setError,
    handleLogout,
    formatTimestampToTime,
    setMessage,
    setMessages,
    message,
    messages,
    handleSend,
  };
}
