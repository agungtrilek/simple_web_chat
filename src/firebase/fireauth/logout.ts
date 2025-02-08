import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";
import useHooks from "../../Hook/useHooks";

export async function logout() {
  try {
    await signOut(auth);
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
