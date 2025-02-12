import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, Firestore, setDoc } from "firebase/firestore";

export const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      createdAt: Date.now(),
      teman: [],
    };
    console.log("Google Login Successful", result.user);
    await setDoc(doc(db, "users", result.user.uid), userData);
    return result.user;
  } catch (error) {
    console.error("Google Login Failed", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Email Login Successful", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Email Login Failed", error);
    throw error;
  }
};

export const registration = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    return alert("maaf password tidak sama");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userData1 = {
      uid: user.uid,
      email: user.email,
      createdAt: Date.now(),
      teman: [],
    };
    await setDoc(doc(db, "users", user.uid), userData1);

    return console.log("berhasil regiss");
  } catch (error: any) {
    return console.log("gagal regiss");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
