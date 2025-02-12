import { Button, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import useHooks from "../../../Hook/useHooks";
import Input from "../../../components/common/form/Input";
import Title from "../../../components/common/form/Title";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebase/config/firebase";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../../firebase/fireauth/Auth";

export default function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Pantau status autentikasi
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        navigate("/dashboard"); // Arahkan ke dashboard jika login
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("mencoba login");
      await loginWithEmail(email, password);
      navigate("/dashboard");
      console.log("login berhasil");
    } catch (error) {
      setError(error);
      console.log("gagal login", error);
    }
  };

  return (
    <Modal show={true} size="md" popup initialFocus={emailInputRef}>
      <Modal.Body>
        <Title
          title="Log-In"
          className="text-3xl font-bold text-green-400 py-6"
        />
        <form className="space-y-3" onSubmit={handleLogin}>
          {error && <p className="text-red-500">("gagal login", error)</p>}
          <Input
            id="email"
            ValueLabel="Email"
            placeholder="Masukkan Email Anda"
            type="email"
            valueInput={email}
            onChange={(e: any) => setEmail(e.target.value)}
            classNameLabel="text-xl"
          />
          <Input
            id="password"
            ValueLabel="Password"
            placeholder="Masukkan Password Anda"
            type="password"
            valueInput={password}
            onChange={(e: any) => setPassword(e.target.value)}
            classNameLabel="text-xl"
          />
          <Button type="submit">Log in to your account</Button>
        </form>
      </Modal.Body>
      <Modal.Footer className="self-center">
        <Button onClick={loginWithGoogle}>Log in With Google</Button>
        <Button>
          <a
            href="/registration"
            className=" hover:underline dark:text-cyan-500"
          >
            Registration
          </a>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
