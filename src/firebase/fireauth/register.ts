import React from "react";
import useHooks from "../../Hook/useHooks";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function register({ payload }: { payload: any }) {
  const {
    setConfirmPassword,
    setEmail,
    setError,
    setPassword,
    navigate,
    password,
    email,
    confirmPassword,
  } = useHooks();
  payload.preventDefault();
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
}
