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
  const [idToChat, setIdToChat] = useState(null);
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

  // pertemanan

  // userFirebase

  // send firebase

  return {
    location,
    loading,
    idToChat,
    navigate,
    setIdToChat,
    formatTimestampToTime,
  };
}
