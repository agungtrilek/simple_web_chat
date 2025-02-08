import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
