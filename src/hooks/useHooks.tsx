import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, push, onValue } from "firebase/database";
import { db } from "../firebase/firebase";

import React from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import sendFirebase from "../firebase/sendFirebase";

export default function useHooks() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [idToChat, setIdToChat] = useState(null);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();
  // const { user } = useSelector((state: RootState) => state.auth);

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

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("result", user);
      console.log("Google Login Successful", user);
    } catch (error) {
      console.error("Google Login Failed", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        createdAt: Date.now(),
        teman: [],
      };
      await setDoc(doc(db, "users", user.uid), userData);

      alert("registrasi berhasil");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/"); // Redirect to login page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    googleProvider,
    navigate,
    location,
    email,
    password,
    confirmPassword,
    error,
    userAuth,
    loading,
    idToChat,
    setEmail,
    setPath,
    setPassword,
    setConfirmPassword,
    setIdToChat,
    setError,
    handleLogin,
    handleRegister,
    handleLogout,
    signInWithGoogle,
    formatTimestampToTime,
  };
}
