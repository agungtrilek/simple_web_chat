import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";

export async function loginWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("result", user);
    console.log("Google Login Successful", user);
  } catch (error) {
    console.error("Google Login Failed", error);
  }
}
